import { useEffect, useState } from "react";
import {
  Power,
  Folder,
  Gamepad2,
  Code2,
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
  Terminal
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
  { id: "computer", title: "Este equipo", icon: Monitor },
  { id: "games", title: "Juegos", icon: Gamepad2, game: true },
  {
  id: "Terminal",
  title: "Terminal",
  icon: Terminal,
  terminal: true,
    },

 {
  id: "projects",
  title: "Mis proyectos",
  icon: Folder,
  explorer: true,
  files: [
    {
      type: "folder",
      name: "Fabbro Solutions",
    },
    {
      type: "folder",
      name: "QRFlat",
    },
    {
      type: "folder",
      name: "Charlie's Parking",
    },
    {
      type: "folder",
      name: "Automatizaciones",
    },
    {
      type: "folder",
      name: "Webs institucionales",
    },
    {
      type: "file",
      name: "ideas.txt",
    },
  ],
    },

  {
  id: "documents",
  title: "Documentos",
  icon: FileText,
  explorer: true,
  files: [
    {
      type: "file",
      name: "NelsonCV.pdf",
    },
    {
      type: "file",
      name: "future_projects.txt",
    },
    {
      type: "file",
      name: "ideas_millonarias.txt",
    },
    {
      type: "file",
      name: "README.txt",
    },
    {
      type: "file",
      name: "architecture_notes.docx",
    },
    {
      type: "file",
      name: ".gitignore",
    },
  ],
},
  {
    id: "trash",
    title: "Papelera",
    icon: Trash2,
    content: "No hay archivos eliminados.\n\nBueno... salvo algunas malas ideas.",
  },
];

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

    for (let index of emptyCells) {
      const testBoard = [...currentBoard];
      testBoard[index] = "O";
      if (checkWinner(testBoard) === "O") return index;
    }

    for (let index of emptyCells) {
      const testBoard = [...currentBoard];
      testBoard[index] = "X";
      if (checkWinner(testBoard) === "X") return index;
    }

    if (currentBoard[4] === null) return 4;

    const corners = [0, 2, 6, 8].filter((index) => currentBoard[index] === null);
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }

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
      const emptyCells = newBoard.filter((cell) => cell === null);
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

                          <div className="space-y-3 text-left text-sm">
                              {visibleLines.map((line, index) => (
                  <motion.p
  key={index}
  initial={{ opacity: 0, x: -12 }}
  animate={{ opacity: 1, x: 0 }}
  className="pl-2"
                                  >
                                      
                    <span className="text-lime-500">~/system $</span> {line}
                  </motion.p>
                ))}

               <div className="pl-2">
  <span className="inline-block h-4 w-2 animate-pulse bg-lime-300" />
                              </div>
                              
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
}) {
  const ActiveIcon = activeWindow.icon;
  const isLargeWindow = activeWindow.id === "computer" || activeWindow.game;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 30 }}
      className={`absolute left-1/2 top-1/2 z-40 w-[94vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-lime-400/25 bg-[#050805]/90 shadow-[0_0_80px_rgba(132,204,22,0.18)] backdrop-blur-2xl ${
        isLargeWindow ? "max-w-5xl" : "max-w-2xl"
      }`}
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

      <div className="max-h-[78vh] overflow-y-auto p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lime-400/10 text-lime-300 sm:h-14 sm:w-14">
            <ActiveIcon size={26} />
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-lime-400">
              Módulo
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
       ) : activeWindow.id === "computer" ? (
  <ComputerInfo />
) : activeWindow.terminal ? (
  <FakeTerminal />
) : activeWindow.explorer ? (
  <FileExplorer files={activeWindow.files} />
) : (                       
          <pre className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/50 p-5 font-mono text-sm leading-relaxed text-white/70">
            {activeWindow.content}
          </pre>
        )}
      </div>
    </motion.div>
  );
}

function ComputerInfo() {
  const specs = [
    {
      label: "Procesador",
      value: "Creative Logic Core",
      detail: "8 procesos activos",
      metric: "37%",
      color: "lime",
      footer: "Velocidad 3.64 GHz · Temp. 43°C",
    },
    {
      label: "Memoria",
      value: "16 GB Runtime Memory",
      detail: "React modules loaded",
      metric: "63%",
      color: "purple",
      footer: "En uso 10.1 GB · Disponible 5.9 GB",
    },
    {
      label: "Motor gráfico",
      value: "Web Interface Renderer",
      detail: "Framer Motion + Tailwind UI",
      metric: "71%",
      color: "lime",
      footer: "WebGL · Renderer activo · 60 FPS",
    },
    {
      label: "Red",
      value: "Connection Stable",
      detail: "Latencia estable y rendimiento óptimo",
      metric: "24%",
      color: "lime",
      footer: "Descarga 48.2 Mbps · Subida 18.7 Mbps",
    },
    {
      label: "Almacenamiento",
      value: "Portfolio Drive (D:)",
      detail: "Proyectos, juegos y experimentos",
      metric: "42%",
      color: "lime",
      footer: "196 GB usados · 465 GB disponibles",
      storage: true,
    },
    {
      label: "Uptime",
      value: "04h 22m 18s",
      detail: "Tiempo activo del sistema",
      metric: null,
      color: "lime",
      footer: "Inicio: 06/05/2026 18:08:12",
      bars: true,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-lime-400/20 bg-black/50 p-5">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-lime-400">
          Información del sistema
        </p>

        <h3 className="mt-3 text-2xl font-black text-white sm:text-3xl">
        Virtual Machine
        </h3>

        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
          Entorno interactivo ejecutándose dentro del portfolio. Sistema diseñado
          para explorar juegos, proyectos y experiencias visuales livianas.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <MiniStatus label="Estado" value="Online" />
          <MiniStatus label="Build" value="2026.05" />
          <MiniStatus label="Modo" value="Interactive" />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {specs.map((item) => (
          <PerformanceCard key={item.label} item={item} />
        ))}
      </div>

      <div className="rounded-2xl border border-lime-400/20 bg-lime-400/5 p-4 font-mono text-xs text-white/60">
        <p className="mb-2 text-lime-300">Procesos activos</p>
        <p>react.runtime.exe</p>
        <p>games.lab.module</p>
        <p>portfolio.interface</p>
        <p>visual.transition.engine</p>
      </div>
    </div>
  );
}

function PerformanceCard({ item }) {
  const isPurple = item.color === "purple";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-lime-400">
        {item.label}
      </p>

      <h4 className="mt-2 text-base font-black text-white sm:text-lg">
        {item.value}
      </h4>

      <p className="mt-1 text-xs text-white/45">{item.detail}</p>

      {item.storage ? (
        <StorageBar />
      ) : item.bars ? (
        <MiniBars />
      ) : (
        <div className="mt-4 grid grid-cols-[58px_1fr] items-center gap-3 sm:grid-cols-[70px_1fr] sm:gap-4">
          <div>
            <LiveMetric value={item.metric} purple={isPurple} />
            <p
              className={`mt-1 font-mono text-[10px] ${
                isPurple ? "text-fuchsia-300" : "text-lime-300"
              }`}
            >
              En uso
            </p>
          </div>

          <MiniGraph purple={isPurple} />
        </div>
      )}

      <p className="mt-3 border-t border-white/10 pt-3 font-mono text-[10px] text-white/45">
        {item.footer}
      </p>
    </div>
  );
}

function LiveMetric({ value, purple }) {
  const numeric = parseInt(value, 10);
  const [current, setCurrent] = useState(numeric);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => {
        const variation = Math.floor(Math.random() * 14) - 7;
        let next = prev + variation;
        if (next < 12) next = 12;
        if (next > 96) next = 96;
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.p
      key={current}
      initial={{ opacity: 0.5, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`text-2xl font-black sm:text-3xl ${
        purple ? "text-fuchsia-400" : "text-lime-400"
      }`}
    >
      {current}%
    </motion.p>
  );
}

function MiniGraph({ purple = false }) {
  const generatePoints = () =>
    Array.from({ length: 18 }, () => Math.floor(Math.random() * 55) + 22);

  const [points, setPoints] = useState(generatePoints());

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(generatePoints());
    }, 900);

    return () => clearInterval(interval);
  }, []);

  const polyline = points
    .map((value, index) => {
      const x = (index / (points.length - 1)) * 100;
      const y = 100 - value;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="relative h-20 overflow-hidden rounded-xl border border-white/10 bg-black/40 sm:h-24">
      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[size:18px_18px]" />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <motion.polyline
          key={polyline}
          points={polyline}
          fill="none"
          stroke={purple ? "#e879f9" : "#a3e635"}
          strokeWidth="2"
          initial={{ opacity: 0.45 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
      </svg>

      <div className="absolute right-2 top-2 font-mono text-[8px] text-white/50">
        100%
      </div>
      <div className="absolute right-2 top-1/2 font-mono text-[8px] text-white/50">
        50%
      </div>
      <div className="absolute right-2 bottom-2 font-mono text-[8px] text-white/50">
        0%
      </div>
    </div>
  );
}

function StorageBar() {
  return (
    <div className="mt-5">
      <div className="flex items-center gap-3">
        <p className="text-2xl font-black text-lime-400 sm:text-3xl">42%</p>

        <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "42%" }}
            transition={{ duration: 1 }}
            className="h-full rounded-full bg-lime-400"
          />
        </div>
      </div>

      <p className="mt-1 font-mono text-[10px] text-lime-300">En uso</p>
    </div>
  );
}

function MiniBars() {
  const [bars, setBars] = useState([
    20, 55, 38, 78, 30, 48, 72, 26, 64, 42, 85, 35, 60, 44, 70,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(Array.from({ length: 15 }, () => Math.floor(Math.random() * 70) + 20));
    }, 900);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-5 flex h-14 items-end gap-1 sm:h-16">
      {bars.map((height, index) => (
        <motion.div
          key={index}
          animate={{ height: `${height}%` }}
          transition={{ duration: 0.35 }}
          className="w-full rounded-t bg-lime-400"
        />
      ))}
    </div>
  );
}

function MiniStatus({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
        {label}
      </p>
      <p className="mt-1 font-bold text-lime-300">{value}</p>
    </div>
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
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
      <div className="mb-5 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-lime-400">
          Games
        </p>

        <h3 className="mt-2 text-2xl font-black sm:text-3xl">
          {selectedGame === "tictactoe" ? "Ta-Te-Ti" : "Memory"}
        </h3>

        <p className="mt-3 max-w-xl text-sm text-white/60">
          Mini juegos livianos, táctiles y pensados para funcionar perfecto en móvil.
        </p>
      </div>

      <div className="mb-5 flex gap-3">
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

        setTimeout(() => setSelected([]), 500);
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

function FakeTerminal() {
  return (
    <div className="w-full rounded-2xl border border-lime-400/20 bg-black/80 p-5 font-mono text-sm text-lime-300">
      <div className="mb-4 flex items-center gap-2 border-b border-lime-400/10 pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-lime-400" />
        <span className="ml-3 text-xs uppercase tracking-[0.25em] text-white/40">
          nelson-os terminal
        </span>
      </div>

      <div className="space-y-3 text-left">
        <p>
          <span className="text-lime-500">C:\NelsonOS&gt;</span> npm run dev
        </p>
        <p className="pl-4 text-white/55">VITE v7.3.1 ready in 428 ms</p>

        <p>
          <span className="text-lime-500">C:\NelsonOS&gt;</span> loading modules
        </p>
        <p className="pl-4 text-white/55">✓ games.lab.module loaded</p>
        <p className="pl-4 text-white/55">✓ virtual.machine.interface active</p>
        <p className="pl-4 text-white/55">✓ portfolio.runtime online</p>

        <p>
          <span className="text-lime-500">C:\NelsonOS&gt;</span> status
        </p>
        <p className="pl-4 text-lime-300">
          SYSTEM ONLINE · INTERACTIVE MODE ACTIVE
        </p>

        <p className="pt-2">
          <span className="text-lime-500">C:\NelsonOS&gt;</span>{" "}
          <span className="inline-block h-4 w-2 animate-pulse bg-lime-300 align-middle" />
        </p>
      </div>
    </div>
  );
}

function FileExplorer({ files = [] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {files.map((file, index) => {
        const isFolder = file.type === "folder";

        return (
          <button
            key={index}
            className="group flex flex-col items-center rounded-2xl border border-white/10 bg-black/40 p-5 transition hover:border-lime-400/40 hover:bg-lime-400/10"
          >
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
                isFolder
                  ? "bg-lime-400/10 text-lime-300"
                  : "bg-white/5 text-white/70"
              }`}
            >
              {isFolder ? <Folder size={30} /> : <FileText size={28} />}
            </div>

            <span className="mt-3 text-center font-mono text-xs text-white/70 group-hover:text-lime-300">
              {file.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}