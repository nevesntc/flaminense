import React, { useState } from "react";
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

export default function TeamBuilder() {
  const [mode, setMode] = useState("3v3");
  const [selected, setSelected] = useState([]);
  const [activeId, setActiveId] = useState(null);

  function handleModeChange(e) {
    setMode(e.target.value);
    setSelected([]);
  }

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
      newSelected = [...newSelected, ...Array(slotsCount - newSelected.length).fill(null)];
    }

    // Arrastar jogador do banco para slot vazio
    if (over.id.startsWith("slot-") && !active.id.startsWith("slot-")) {
      const slotIdx = Number(over.id.replace("slot-", ""));
      const draggedPlayer = players.find((p) => p.id === active.id);
      if (!draggedPlayer) return;

      newSelected[slotIdx] = draggedPlayer;
      // remove duplicados
      const uniqueSelected = newSelected.filter(
        (p, i) => p && newSelected.findIndex((pp) => pp && pp.id === p.id) === i
      );
      setSelected(uniqueSelected);
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
  }

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

      {/* Botão Reset no canto superior esquerdo */}
      <button
        onClick={() => setSelected([])}
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

        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {/* Slots do time */}
          <div className="flex gap-4 sm:gap-8 justify-center mb-4 sm:mb-8 flex-wrap">
            {Array(mode === "3v3" ? 3 : 4)
              .fill(0)
              .map((_, idx) => {
                const player = selected[idx];
                const slotId = `slot-${idx}`;
                return <SlotCard key={slotId} id={slotId} player={player} />;
              })}
          </div>

          {/* Banco de jogadores */}
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mt-2 sm:mt-4">
            {players.map((player) => (
              <PlayerCard key={player.id} player={player} selected={selected} />
            ))}
          </div>

          {/* Drag Overlay */}
          <DragOverlay>
            {activeId && (() => {
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
      </div>
    </section>
  );
}

// Componente do banco de jogadores
function PlayerCard({ player, selected }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: player.id,
  });
  const isSelected = selected.find((p) => p?.id === player.id);

  return (
    <motion.div
      layout
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`relative rounded-lg shadow-md overflow-hidden min-w-[80px] max-w-[100px] h-[100px] sm:min-w-[100px] sm:max-w-[120px] sm:h-[140px] flex flex-col justify-end cursor-grab group ${
        isSelected ? "ring-4 ring-primary/70 opacity-60" : ""
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

// Slot do time
function SlotCard({ id, player }) {
  const { setNodeRef: setDropRef, isOver } = useDroppable({ id });
  const { attributes, listeners, setNodeRef: setDragRef } = useDraggable({
    id: player ? `slot-${id.split("-")[1]}` : id,
  });

  return (
    <div
      ref={setDropRef}
      className={`relative min-w-[90px] max-w-[110px] h-[120px] sm:min-w-[140px] sm:max-w-[160px] sm:h-[220px] rounded-xl flex flex-col items-center justify-end border-2 ${
        isOver ? "border-primary" : "border-transparent"
      } bg-gray-200/60 overflow-hidden`}
    >
      {player ? (
        <div
          ref={setDragRef}
          {...listeners}
          {...attributes}
          className="w-full h-full cursor-grab"
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
      ) : null}
    </div>
  );
}
