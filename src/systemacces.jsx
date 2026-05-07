import { useEffect, useState } from "react";
import {
    Terminal,
    Power,
    Folder,
    Gamepad2,
    Code2,
    User,
    Mail,
    Settings,
    X,
    Minimize2,
    RotateCcw,
    Rocket,
    Monitor,
FileText,
Trash2,
Image,
HardDrive,
Globe,
Layers,
Puzzle,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  "INITIALIZING SYSTEM...",
  "LOADING DESKTOP ENVIRONMENT...",
  "MOUNTING PORTFOLIO MODULES...",
  "CONNECTING INTERACTIVE LAYER...",
  "AUTHENTICATING USER...",
  "ACCESS GRANTED",
];

const initialBoard = Array(9).fill(null);

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const desktopApps = [
  {
    id: "computer",
    title: "Este equipo",
    icon: Monitor,
    explorer: true,
  },
  {
    id: "games",
    title: "Juegos",
    icon: Gamepad2,
    game: true,
  },
  {
    id: "photos",
    title: "Fotos",
    icon: Image,
    content:
      "Acá podés poner fotos tuyas, hobbies, lugares, familia, viajes o cosas que muestren personalidad sin repetir el CV.",
  },
  {
    id: "projects",
    title: "Mis proyectos",
    icon: Folder,
    content:
      "Fabbro Solutions\nQRFlat\nCharlie's Parking\nAutomatizaciones\nWebs institucionales",
  },
  {
    id: "documents",
    title: "Documentos",
    icon: FileText,
    content:
      "CV.pdf\nNotas de proyectos.txt\nIdeas futuras.txt\nREADME.txt",
  },
  {
    id: "trash",
    title: "Papelera",
    icon: Trash2,
    content:
      "No hay archivos eliminados.\n\nBueno... salvo algunas malas ideas de diseño.",
  },
];
function VirtualExplorer() {
  const quickAccess = [
    "Escritorio",
    "Descargas",
    "Documentos",
    "Imágenes",
    "Música",
    "Videos",
  ];

  const drives = [
    {
      name: "Disco local (C:)",
      detail: "Sistema operativo virtual",
      percent: "64%",
    },
    {
      name: "Portfolio Drive (D:)",
      detail: "Proyectos, juegos y experimentos",
      percent: "38%",
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#080b08]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3 font-mono text-xs text-white/60">
        <span className="text-lime-300">Este equipo</span>
      </div>

      <div className="grid min-h-[330px] grid-cols-[150px_1fr]">
        <aside className="border-r border-white/10 bg-black/30 p-3 font-mono text-xs text-white/60">
          <p className="mb-3 text-lime-300">Acceso rápido</p>

          <div className="space-y-2">
            {quickAccess.map((item) => (
              <button
                key={item}
                className="block w-full rounded-lg px-3 py-2 text-left transition hover:bg-lime-400/10 hover:text-lime-300"
              >
                {item}
              </button>
            ))}
          </div>
        </aside>

        <main className="p-4">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-white/40">
            Carpetas
          </p>

          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {quickAccess.map((folder) => (
              <button
                key={folder}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 p-3 text-left text-sm text-white/70 transition hover:border-lime-400/40 hover:bg-lime-400/10 hover:text-lime-300"
              >
                <Folder size={18} />
                {folder}
              </button>
            ))}
          </div>

          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-white/40">
            Dispositivos y unidades
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {drives.map((drive) => (
              <div
                key={drive.name}
                className="rounded-xl border border-white/10 bg-black/30 p-4"
              >
                <div className="mb-3 flex items-center gap-3">
                  <HardDrive size={20} className="text-lime-300" />
                  <div>
                    <p className="text-sm font-bold text-white/80">
                      {drive.name}
                    </p>
                    <p className="text-xs text-white/40">{drive.detail}</p>
                  </div>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-lime-400"
                    style={{ width: drive.percent }}
                  />
                </div>

                <p className="mt-2 font-mono text-[10px] text-white/40">
                  {drive.percent} usado
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function SystemAccess() {
  const [booting, setBooting] = useState(false);
  const [systemMode, setSystemMode] = useState(false);
  const [visibleLines, setVisibleLines] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
    const [selectedGame, setSelectedGame] = useState("tictactoe");
  const [board, setBoard] = useState(initialBoard);
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const startSystem = () => {
    setBooting(true);
    setVisibleLines([]);
  };

  useEffect(() => {
    if (!booting) return;

    bootLines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
      }, index * 650);
    });

    const finish = setTimeout(() => {
      setBooting(false);
      setSystemMode(true);
    }, bootLines.length * 650 + 700);

    return () => clearTimeout(finish);
  }, [booting]);

  const checkWinner = (newBoard) => {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;

      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }

    if (newBoard.every(Boolean)) return "draw";

    return null;
  };
  const getBestMachineMove = (currentBoard) => {
  const emptyCells = currentBoard
    .map((cell, index) => (cell === null ? index : null))
    .filter((cell) => cell !== null);

  // 1. La máquina intenta ganar
  for (let index of emptyCells) {
    const testBoard = [...currentBoard];
    testBoard[index] = "O";

    if (checkWinner(testBoard) === "O") {
      return index;
    }
  }

  // 2. La máquina bloquea al jugador
  for (let index of emptyCells) {
    const testBoard = [...currentBoard];
    testBoard[index] = "X";

    if (checkWinner(testBoard) === "X") {
      return index;
    }
  }

  // 3. Toma el centro
  if (currentBoard[4] === null) {
    return 4;
  }

  // 4. Toma una esquina
  const corners = [0, 2, 6, 8].filter((index) => currentBoard[index] === null);

  if (corners.length > 0) {
    return corners[Math.floor(Math.random() * corners.length)];
  }

  // 5. Cualquier celda libre
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    };
    
   

 const handleCellClick = (index) => {
  if (board[index] || winner || !isXTurn) return;

  const newBoard = [...board];
  newBoard[index] = "X";

  setBoard(newBoard);

  const result = checkWinner(newBoard);

  if (result) {
    setWinner(result);
    return;
  }

  setIsXTurn(false);

  setTimeout(() => {
    const emptyCells = newBoard
      .map((cell, i) => (cell === null ? i : null))
      .filter((cell) => cell !== null);

    if (emptyCells.length === 0) return;

    const bestMove = getBestMachineMove(newBoard);

const machineBoard = [...newBoard];
      machineBoard[bestMove] = "O";
      

    setBoard(machineBoard);

    const machineResult = checkWinner(machineBoard);

    if (machineResult) {
      setWinner(machineResult);
    } else {
      setIsXTurn(true);
    }
  }, 500);
    };
    

  const resetGame = () => {
    setBoard(initialBoard);
    setWinner(null);
    setIsXTurn(true);
  };

  const exitSystem = () => {
    setSystemMode(false);
    setBooting(false);
    setVisibleLines([]);
    setActiveWindow(null);
    resetGame();
  };

  return (
    <>
      {!systemMode && !booting && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
        >
          <div className="rounded-2xl border border-lime-400/30 bg-black/70 px-5 py-3 backdrop-blur-xl shadow-[0_0_35px_rgba(163,230,53,0.18)]">
            <div className="mb-2 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-lime-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-lime-400" />
              System Status: Online
            </div>

            <button
              onClick={startSystem}
              className="rounded-full bg-lime-400 px-6 py-2 text-xs font-black uppercase tracking-widest text-black transition hover:scale-105 hover:bg-lime-300"
            >
              Access System
            </button>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {booting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black text-lime-300"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(132,204,22,0.13),transparent_45%)]" />
            <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.12)_51%)] bg-[length:100%_4px]" />

            <div className="relative w-[90%] max-w-2xl rounded-3xl border border-lime-400/20 bg-black/80 p-8 font-mono shadow-[0_0_60px_rgba(132,204,22,0.2)]">
              <div className="mb-6 flex items-center gap-3 border-b border-lime-400/20 pb-4">
                <Terminal size={18} />
                <span className="text-xs uppercase tracking-[0.3em]">
                  Nelson OS
                </span>
              </div>

              <div className="space-y-3 text-sm">
                {visibleLines.map((line, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <span className="text-lime-500">~/system $</span> {line}
                  </motion.p>
                ))}

                <span className="inline-block h-4 w-2 animate-pulse bg-lime-300" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {systemMode && (
          <motion.section
            initial={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[998] overflow-hidden bg-[#020402] text-white"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(132,204,22,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.1),transparent_35%)]" />
            <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:54px_54px]" />

            <div className="relative z-20 flex h-12 items-center justify-between border-b border-white/10 bg-black/40 px-5 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 animate-pulse rounded-full bg-lime-400" />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
                  Nelson OS
                </span>
              </div>

              <button
                onClick={exitSystem}
                className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/70 transition hover:border-lime-400 hover:text-lime-300"
              >
                <Power size={13} />
                Exit
              </button>
            </div>

            <div className="relative z-10 h-[calc(100vh-96px)] p-6">
              <div className="grid w-fit grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-2">
                {desktopApps.map((app, index) => {
                  const Icon = app.icon;

                  return (
                    <motion.button
                      key={app.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06 }}
                      onClick={() => setActiveWindow(app)}
                      className="group flex w-28 flex-col items-center gap-2 rounded-2xl p-3 text-center transition hover:bg-white/10"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-lime-400/30 bg-black/50 text-lime-300 shadow-[0_0_25px_rgba(132,204,22,0.12)] transition group-hover:scale-110 group-hover:bg-lime-400 group-hover:text-black">
                        <Icon size={24} />
                      </div>

                      <span className="font-mono text-xs text-white/80">
                        {app.title}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="absolute bottom-6 right-6 hidden max-w-sm rounded-3xl border border-lime-400/20 bg-black/50 p-5 font-mono text-xs text-white/60 backdrop-blur-xl md:block">
                <p className="mb-2 text-lime-300">SYSTEM MESSAGE</p>
                <p>
                  Bienvenido al modo interactivo. Abrí módulos, explorá proyectos
                  y jugá dentro del portfolio.
                </p>
              </div>
            </div>

            <AnimatePresence>
              {activeWindow && (
                <SystemWindow
                activeWindow={activeWindow}
                setActiveWindow={setActiveWindow}
                board={board}
                isXTurn={isXTurn}
                winner={winner}
                handleCellClick={handleCellClick}
                resetGame={resetGame}
                selectedGame={selectedGame}
                setSelectedGame={setSelectedGame}
                              />
                              
              )}
            </AnimatePresence>

            <div className="absolute bottom-0 left-0 right-0 z-30 flex h-12 items-center justify-between border-t border-white/10 bg-black/60 px-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <button className="flex h-8 items-center gap-2 rounded-xl border border-lime-400/30 bg-lime-400/10 px-3 font-mono text-xs text-lime-300">
                  <Settings size={14} />
                  Start
                </button>

                {activeWindow && (
                  <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-white/70">
                    {activeWindow.title}
                  </div>
                )}
              </div>

              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
                Interactive Portfolio
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}

    function SystemWindow({
    activeWindow,
    setActiveWindow,
    board,
    isXTurn,
    winner,
    handleCellClick,
    resetGame,
    selectedGame,
    setSelectedGame,
    })  {
  const ActiveIcon = activeWindow.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 30 }}
      className="absolute left-1/2 top-1/2 z-40 w-[92%] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-lime-400/25 bg-[#050805]/90 shadow-[0_0_80px_rgba(132,204,22,0.18)] backdrop-blur-2xl"
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveWindow(null)}
              className="h-3 w-3 rounded-full bg-red-400"
            />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-lime-400" />
          </div>

          <span className="font-mono text-xs uppercase tracking-[0.25em] text-lime-300">
            {activeWindow.title}
          </span>
        </div>

        <div className="flex items-center gap-3 text-white/50">
          <Minimize2 size={14} />
          <button onClick={() => setActiveWindow(null)}>
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="min-h-[260px] p-6">
        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-400/10 text-lime-300">
            <ActiveIcon size={26} />
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-lime-400">
              Module
            </p>
            <h3 className="text-2xl font-black">{activeWindow.title}</h3>
          </div>
        </div>

        {activeWindow.game ? (
          <GamesLab
  board={board}
  isXTurn={isXTurn}
  winner={winner}
  handleCellClick={handleCellClick}
  resetGame={resetGame}
  selectedGame={selectedGame}
  setSelectedGame={setSelectedGame}
                  />
                  
        ) : (
          <pre className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/50 p-5 font-mono text-sm leading-relaxed text-white/70">
            {activeWindow.content}
          </pre>
        )}
      </div>
    </motion.div>
  );
}

function GamesLab({
  board,
  isXTurn,
  winner,
  handleCellClick,
  resetGame,
  selectedGame,
  setSelectedGame,
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-lime-400">
          Games
        </p>

        <h3 className="mt-2 text-3xl font-black">
          {selectedGame === "tictactoe" ? "Ta-Te-Ti" : "Memory"}
        </h3>

        <p className="mt-3 text-sm text-white/60">
          Mini juegos livianos, táctiles y pensados para funcionar perfecto en móvil.
        </p>
      </div>

      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setSelectedGame("tictactoe")}
          className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest transition ${
            selectedGame === "tictactoe"
              ? "bg-lime-400 text-black"
              : "border border-white/10 bg-white/5 text-white/60 hover:border-lime-400 hover:text-lime-300"
          }`}
        >
          Ta-Te-Ti
        </button>

        <button
          onClick={() => setSelectedGame("memory")}
          className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest transition ${
            selectedGame === "memory"
              ? "bg-lime-400 text-black"
              : "border border-white/10 bg-white/5 text-white/60 hover:border-lime-400 hover:text-lime-300"
          }`}
        >
          Memory
        </button>
      </div>

      {selectedGame === "tictactoe" ? (
        <TicTacToeGame
          board={board}
          isXTurn={isXTurn}
          winner={winner}
          handleCellClick={handleCellClick}
          resetGame={resetGame}
        />
      ) : (
        <MemoryGame />
      )}
    </div>
  );
}

function TicTacToeGame({
  board,
  isXTurn,
  winner,
  handleCellClick,
  resetGame,
}) {
  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleCellClick(index)}
            className="flex h-20 w-20 items-center justify-center rounded-2xl border border-lime-400/20 bg-black/50 text-3xl font-black text-lime-300 transition hover:border-lime-400 hover:bg-lime-400/10 sm:h-24 sm:w-24"
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="mt-6 text-center">
        {winner ? (
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-lime-300">
              {winner === "draw" ? "Empate" : `Ganador: ${winner}`}
            </p>

            <button
              onClick={resetGame}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-lime-400 px-5 py-2 text-xs font-black uppercase tracking-widest text-black transition hover:bg-lime-300"
            >
              <RotateCcw size={14} />
              Reiniciar
            </button>
          </div>
        ) : (
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-white/60">
            {isXTurn ? "Tu turno" : "Pensando..."}
          </p>
        )}
      </div>
    </>
  );
}

const memoryCardsBase = [
  { id: "react", label: "React", icon: Code2 },
  { id: "api", label: "API", icon: Globe },
  { id: "deploy", label: "Deploy", icon: Rocket },
  { id: "ux", label: "UX", icon: Layers },
  { id: "logic", label: "Logic", icon: Puzzle },
  { id: "system", label: "System", icon: Terminal },
];

function createMemoryDeck() {
  return [...memoryCardsBase, ...memoryCardsBase]
    .map((card, index) => ({
      ...card,
      uniqueId: `${card.id}-${index}`,
      matched: false,
    }))
    .sort(() => Math.random() - 0.5);
}

function MemoryGame() {
  const [cards, setCards] = useState(createMemoryDeck);
  const [selected, setSelected] = useState([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const completed = cards.every((card) => card.matched);

  const handleCardClick = (cardIndex) => {
    if (locked) return;
    if (cards[cardIndex].matched) return;
    if (selected.includes(cardIndex)) return;
    if (selected.length === 2) return;

    const newSelected = [...selected, cardIndex];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setMoves((prev) => prev + 1);

      const [firstIndex, secondIndex] = newSelected;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.id === secondCard.id) {
        setCards((prev) =>
          prev.map((card, index) =>
            index === firstIndex || index === secondIndex
              ? { ...card, matched: true }
              : card
          )
        );

        setTimeout(() => {
          setSelected([]);
        }, 500);
      } else {
        setLocked(true);

        setTimeout(() => {
          setSelected([]);
          setLocked(false);
        }, 800);
      }
    }
  };

  const resetMemory = () => {
    setCards(createMemoryDeck());
    setSelected([]);
    setMoves(0);
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-white/60">
        <span>Moves: {moves}</span>
        <span className="text-lime-400">
          {completed ? "Completed" : "Find pairs"}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {cards.map((card, index) => {
          const Icon = card.icon;
          const isVisible = selected.includes(index) || card.matched;

          return (
            <button
              key={card.uniqueId}
              onClick={() => handleCardClick(index)}
              className={`flex h-20 w-20 flex-col items-center justify-center rounded-2xl border transition sm:h-24 sm:w-24 ${
                isVisible
                  ? "border-lime-400 bg-lime-400/15 text-lime-300 shadow-[0_0_25px_rgba(132,204,22,0.15)]"
                  : "border-white/10 bg-black/50 text-white/30 hover:border-lime-400/50 hover:bg-lime-400/10"
              }`}
            >
              {isVisible ? (
                <>
                  <Icon size={24} />
                  <span className="mt-2 font-mono text-[10px] font-bold uppercase">
                    {card.label}
                  </span>
                </>
              ) : (
                <span className="font-mono text-2xl font-black">?</span>
              )}
            </button>
          );
        })}
      </div>

      <button
        onClick={resetMemory}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime-400 px-5 py-2 text-xs font-black uppercase tracking-widest text-black transition hover:bg-lime-300"
      >
        <RotateCcw size={14} />
        Reiniciar
      </button>
    </div>
  );
}