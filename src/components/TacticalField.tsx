import React, { useState, useEffect } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import { motion } from "framer-motion";
import { players } from "../data/players";

const bgImage = "/assets/6484668fa13ed491ee3078bcdcb20eb1.jpg";

// --- HOOK PARA DETECTAR MOBILE ---
// Adicionado para verificar o tamanho da tela
function useIsMobile(breakpoint = 768) {
  // 768px é o breakpoint 'sm' do Tailwind
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkScreenSize(); // Verifica no carregamento
    window.addEventListener("resize", checkScreenSize);

    // Limpa o listener ao desmontar
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);

  return isMobile;
}
// --- FIM DO HOOK ---

export default function TeamBuilder() {
  const [mode, setMode] = useState("3v3");
  const [selected, setSelected] = useState([]);
  const [activeId, setActiveId] = useState(null);

  // --- NOVOS ESTADOS ---
  const isMobile = useIsMobile();
  // Estado para rastrear o item "segurado" no mobile
  const [heldItem, setHeldItem] = useState(null); // { player: Player, fromSlot: number | null }

  // --- FUNÇÕES DE DRAG (Desktop) ---
  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) {
      setActiveId(null);
      return;
    }

    let newSelected = [...selected];
    const slotsCount = mode === "3v3" ? 3 : 4;
    if (newSelected.length < slotsCount) {
      newSelected = [
        ...newSelected,
        ...Array(slotsCount - newSelected.length).fill(null),
      ].slice(0, slotsCount);
    }

    // Arrastar jogador do banco para slot
    if (over.id.startsWith("slot-") && !active.id.startsWith("slot-")) {
      const slotIdx = Number(over.id.replace("slot-", ""));
      const draggedPlayer = players.find((p) => p.id === active.id);
      if (!draggedPlayer) return;

      // Remove duplicado se já estiver no time
      newSelected = newSelected.map((p) =>
        p && p.id === draggedPlayer.id ? null : p
      );
      // Adiciona no novo slot
      newSelected[slotIdx] = draggedPlayer;

      setSelected(newSelected);
    }
    // Trocar posições entre dois slots
    else if (active.id.startsWith("slot-") && over.id.startsWith("slot-")) {
      const fromIdx = Number(active.id.replace("slot-", ""));
      const toIdx = Number(over.id.replace("slot-", ""));
      const temp = newSelected[fromIdx];
      newSelected[fromIdx] = newSelected[toIdx];
      newSelected[toIdx] = temp;
      setSelected(newSelected);
    }

    setActiveId(null);
    setHeldItem(null); // Limpa seleção mobile por segurança
  }

  // --- FUNÇÕES DE CLIQUE (Mobile) ---
  function handlePlayerClick(clickedPlayer) {
    if (!isMobile) return;

    // Não deixa pegar do banco se já estiver no time
    const playerOnTeam = selected.find((p) => p && p.id === clickedPlayer.id);
    if (playerOnTeam) return;

    if (heldItem && heldItem.player.id === clickedPlayer.id) {
      setHeldItem(null); // Deseleciona
    } else {
      setHeldItem({ player: clickedPlayer, fromSlot: null }); // Seleciona do banco
    }
  }

  function handleSlotClick(slotIdx) {
    if (!isMobile) return;

    const playerInSlot = selected[slotIdx] || null;
    const slotsCount = mode === "3v3" ? 3 : 4;
    let newSelected = [...selected];
    // Garante que o array de seleção tenha o tamanho correto
    if (newSelected.length < slotsCount) {
      newSelected = [
        ...newSelected,
        ...Array(slotsCount - newSelected.length).fill(null),
      ].slice(0, slotsCount);
    }

    if (heldItem) {
      // --- CASO 1: TEM UM JOGADOR "NA MÃO" ---
      const { player: heldPlayer, fromSlot } = heldItem;

      // Coloca o jogador segurado no slot clicado
      newSelected[slotIdx] = heldPlayer;

      if (fromSlot !== null) {
        // O jogador veio de *outro slot* (troca)
        newSelected[fromSlot] = playerInSlot;
      } else {
        // O jogador veio do *banco*
        // Remove duplicados (caso o jogador já estivesse em outro slot)
        newSelected = newSelected.map((p, i) => {
          if (p && p.id === heldPlayer.id && i !== slotIdx) {
            return null;
          }
          return p;
        });
      }

      setSelected(newSelected);
      setHeldItem(null); // Solta o jogador
    } else {
      // --- CASO 2: NÃO TEM JOGADOR "NA MÃO" ---
      if (playerInSlot) {
        // Pega o jogador do slot
        setHeldItem({ player: playerInSlot, fromSlot: slotIdx });
        // Limpa o slot de onde ele saiu
        newSelected[slotIdx] = null;
        setSelected(newSelected);
      }
      // Se o slot estiver vazio e não tiver jogador na mão, não faz nada
    }
  }

  // --- FUNÇÕES ATUALIZADAS ---
  function handleModeChange(e) {
    setMode(e.target.value);
    setSelected([]);
    setHeldItem(null); // Limpa seleção
  }

  function handleReset() {
    setSelected([]);
    setHeldItem(null); // Limpa seleção
  }

  // Define o conteúdo (slots e banco)
  const teamBuilderContent = (
    <>
      {/* Slots do time */}
      <div className="flex gap-4 sm:gap-8 justify-center mb-4 sm:mb-8 flex-wrap">
        {Array(mode === "3v3" ? 3 : 4)
          .fill(0)
          .map((_, idx) => {
            const player = selected[idx];
            const slotId = `slot-${idx}`;
            return (
              <SlotCard
                key={slotId}
                id={slotId}
                player={player}
                isMobile={isMobile}
                onClick={() => handleSlotClick(idx)} // Passa handler de clique
              />
            );
          })}
      </div>

      {/* Banco de jogadores */}
      <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mt-2 sm:mt-4">
        {players.map((player) => {
          const isHeld =
            isMobile &&
            heldItem?.fromSlot === null && // Veio do banco
            heldItem?.player.id === player.id;
          return (
            <PlayerCard
              key={player.id}
              player={player}
              selected={selected}
              isMobile={isMobile}
              isHeld={isHeld} // Passa estado de "segurando"
              onClick={() => handlePlayerClick(player)} // Passa handler de clique
            />
          );
        })}
      </div>
    </>
  );

  return (
    <section className="relative w-full max-w-5xl min-h-[400px] sm:min-h-[500px] flex flex-col items-center justify-center rounded-xl overflow-hidden mb-8 sm:mb-12 mx-auto px-2 sm:px-0">
      {/* Fundo */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src={bgImage}
          alt="Rocket League Arena"
          className="w-full h-full object-cover opacity-60"
          style={{ objectPosition: "center" }}
        />
      </div>

      {/* Botão Reset atualizado */}
      <button
        onClick={handleReset}
        title="Resetar escalação"
        className="absolute top-2 left-2 sm:top-4 sm:left-4 z-50 bg-red-500 hover:bg-red-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 text-xs sm:text-base"
      >
        Resetar
      </button>

      {/* Conteúdo */}
      <div className="relative z-10 w-full flex flex-col items-center py-4 sm:py-8">
        {/* Seletor de modo */}
        <div className="flex gap-2 sm:gap-4 mb-4 sm:mb-8">
          <label className="font-bold text-white">Modo:</label>
          <select
            value={mode}
            onChange={handleModeChange}
            className="border rounded px-1 py-1 sm:px-2 sm:py-1 text-black bg-white text-xs sm:text-base"
          >
            <option value="3v3">3v3</option>
            <option value="4v4">4v4</option>
          </select>
        </div>

        {/* --- RENDERIZAÇÃO CONDICIONAL --- */}
        {isMobile ? (
          // Em mobile, renderiza o conteúdo diretamente
          teamBuilderContent
        ) : (
          // Em desktop, envolve com DndContext
          <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {teamBuilderContent}

            {/* Drag Overlay SÓ existe em desktop */}
            <DragOverlay>
              {activeId &&
                (() => {
                  const dragPlayer =
                    players.find((p) => p.id === activeId) ||
                    selected.find((p) => p && p.id === activeId);
                  if (!dragPlayer) return null;
                  return (
                    <motion.div className="relative rounded-xl shadow-lg overflow-hidden min-w-[140px] max-w-[160px] h-[220px] flex flex-col justify-end group">
                      <img
                        src={dragPlayer.image}
                        alt={dragPlayer.nickname}
                        className="absolute inset-0 w-full h-full object-cover z-0"
                      />
                      <div className="absolute inset-0 bg-black/50 z-10" />
                      <div className="relative z-20 flex flex-col items-center justify-end h-full pb-4">
                        <div className="font-bold text-base text-white drop-shadow mb-0.5">
                          {dragPlayer.nickname}
                        </div>
                        <div className="text-xs font-medium text-primary uppercase tracking-wide bg-black/60 px-2 py-0.5 rounded-full mb-2">
                          {dragPlayer.position}
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}
            </DragOverlay>
          </DndContext>
        )}
      </div>
    </section>
  );
}

// Componente do banco de jogadores (Atualizado)
function PlayerCard({ player, selected, isMobile, onClick, isHeld }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: player.id,
    disabled: isMobile, // Desabilita D&D no mobile
  });
  const isSelected = selected.find((p) => p?.id === player.id);

  return (
    <motion.div
      layout
      ref={setNodeRef}
      {...(!isMobile ? listeners : {})} // Só aplica listeners em desktop
      {...(!isMobile ? attributes : {})} // Só aplica attributes em desktop
      onClick={isMobile ? onClick : undefined} // Só aplica onClick em mobile
      className={`relative rounded-lg shadow-md overflow-hidden min-w-[80px] max-w-[100px] h-[100px] sm:min-w-[100px] sm:max-w-[120px] sm:h-[140px] flex flex-col justify-end group transition-all ${
        isMobile ? "cursor-pointer" : "cursor-grab"
      } ${
        isSelected
          ? "ring-4 ring-primary/70 opacity-60" // Já está no time
          : "opacity-100"
      } ${
        isHeld
          ? "ring-4 ring-blue-500 scale-105" // Está "na mão"
          : ""
      }`}
    >
      <img
        src={player.image}
        alt={player.nickname}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative z-20 flex flex-col items-center justify-end h-full pb-2 sm:pb-4">
        <div className="font-bold text-[10px] sm:text-xs text-white drop-shadow mb-0.5">
          {player.nickname}
        </div>
        <div className="text-[8px] sm:text-[10px] font-medium text-primary uppercase tracking-wide bg-black/60 px-1 sm:px-2 py-0.5 rounded-full mb-1">
          {player.position}
        </div>
      </div>
    </motion.div>
  );
}

// Slot do time (Atualizado)
function SlotCard({ id, player, isMobile, onClick }) {
  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id,
    disabled: isMobile, // Desabilita D&D no mobile
  });
  const { attributes, listeners, setNodeRef: setDragRef } = useDraggable({
    id: id,
    disabled: isMobile || !player, // Desabilita se for mobile OU se o slot estiver vazio
  });

  return (
    <div
      ref={setDropRef}
      onClick={isMobile ? onClick : undefined} // Aplica clique no slot todo
      className={`relative min-w-[90px] max-w-[110px] h-[120px] sm:min-w-[140px] sm:max-w-[160px] sm:h-[220px] rounded-xl flex flex-col items-center justify-center border-2 ${
        isOver
          ? "border-primary" // Feedback de drop (desktop)
          : isMobile && !player
          ? "border-dashed border-white/50" // Feedback de slot vazio (mobile)
          : "border-transparent"
      } bg-gray-200/60 overflow-hidden ${
        isMobile ? "cursor-pointer" : "" // Cursor de clique no mobile
      }`}
    >
      {player ? (
        <div
          ref={setDragRef}
          {...(!isMobile ? listeners : {})} // Só aplica listeners em desktop
          {...(!isMobile ? attributes : {})} // Só aplica attributes em desktop
          className={`w-full h-full ${!isMobile ? "cursor-grab" : ""}`}
        >
          <img
            src={player.image}
            alt={player.nickname}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="relative z-20 flex flex-col items-center justify-end h-full pb-2 sm:pb-4">
            <div className="font-bold text-[12px] sm:text-base text-white drop-shadow mb-0.5">
              {player.nickname}
            </div>
            <div className="text-[9px] sm:text-xs font-medium text-primary uppercase tracking-wide bg-black/60 px-1 sm:px-2 py-0.5 rounded-full mb-2">
              {player.position}
            </div>
          </div>
        </div>
      ) : (
        // Feedback visual para slot vazio no mobile
        isMobile && (
          <span className="text-5xl text-white/50 font-thin">+</span>
        )
      )}
    </div>
  );
}