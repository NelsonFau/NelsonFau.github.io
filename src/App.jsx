import { motion } from "framer-motion";
import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaJava } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiTailwindcss, SiBootstrap, SiPython } from "react-icons/si";
import fabbro from "./assets/fabbro3D.png";
import QRFlat from "./assets/QRFlat.png";
import parking from "./assets/Parking.png";

const projects = [
  {
    title: "Fabbro Solutions",
    type: "Desarrollo web",
    image: fabbro,
    url: "https://fabbro-solution-git-master-nelson-alvarezs-projects-b71a80d0.vercel.app/",
    description:
      "Sitio web institucional para empresa industrial, enfocado en presencia digital, servicios y propuesta comercial.",
    tech: ["React", "Tailwind", "Framer Motion"],
  },
  {
    title: "Charlie’s Parking",
    type: "Proyecto comercial",
    image: parking,
    url: "https://github.com/NelsonFau/InterfaceParking",
    description:
      "Sistema pensado para gestionar disponibilidad, reservas, precios y comunicación comercial del parking.",
    tech: ["React", "Node.js", "SQL Server"],
  },
  {
    title: "QRFlat",
    type: "Proyecto propio",
    image: QRFlat,
    url: "https://tu-url.com",
    description:
      "Sistema para gestionar planos PDF mediante códigos QR estables, evitando errores de versión.",
    tech: ["Python", "FastAPI", "QR"],
  },
];

export default function App() {
  return (
    <main className="min-h-screen text-[#f4f4ef] bg-[#070b09] overflow-hidden">

      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_5%,rgba(132,204,22,0.18),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(74,222,128,0.10),transparent_28%),radial-gradient(circle_at_50%_75%,rgba(163,230,53,0.12),transparent_35%),linear-gradient(180deg,#07100b_0%,#0b0f0e_38%,#10150f_68%,#070b09_100%)]" />
      <div className="fixed inset-0 -z-10 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* HERO */}
      <section className="relative px-6 pt-32 pb-28 text-center overflow-hidden">
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[620px] h-[620px] bg-lime-400/15 blur-[160px] rounded-full" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-lime-300/30 to-transparent" />

        <div className="relative">
          <p className="text-sm uppercase tracking-[0.35em] text-lime-300 mb-4">
            Analista Programador
          </p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tight"
          >
            Nelson Álvarez
          </motion.h1>

          <p className="mt-6 max-w-2xl mx-auto text-stone-300 leading-7">
            Construyo soluciones de software, automatizaciones e integraciones que simplifican procesos y resuelven necesidades reales de negocio.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <a
              href="#projects"
              className="bg-lime-300 text-black px-7 py-3 rounded-full font-bold hover:bg-white transition shadow-[0_0_40px_rgba(190,242,100,0.25)]"
            >
              Ver proyectos
            </a>
          </div>
        </div>
      </section>

      {/* SOBRE MI */}
      <section className="relative px-6 py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#0c120f]/70 backdrop-blur-[1px]" />
        <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-lime-300/12 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[420px] h-[420px] bg-emerald-400/10 blur-[130px] rounded-full" />

        <div className="relative max-w-4xl mx-auto">
          <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-lime-300 font-semibold mb-3">
                Perfil
              </p>
              <h2 className="text-4xl md:text-5xl font-black">
                Sobre mí
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-lg leading-8 text-stone-300">
                Soy Analista Programador y trabajo en el desarrollo de soluciones reales:
                desde sitios web para empresas hasta herramientas propias enfocadas en
                optimizar procesos.
              </p>

              <p className="text-lg leading-8 text-stone-300">
                Me interesa entender el problema, ordenarlo y construir soluciones que
                realmente funcionen en la práctica.
              </p>

              <div className="mt-8 border-l-4 border-lime-300 pl-6">
                <p className="text-2xl md:text-3xl font-black leading-snug text-white">
                  Si no aporta valor, no sirve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROYECTOS */}
      <section id="projects" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#11170f]/90 via-[#18210f]/80 to-[#0b0f0e]/95" />
        <div className="absolute left-1/2 top-20 -translate-x-1/2 w-[700px] h-[500px] bg-lime-300/10 blur-[160px] rounded-full" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sm text-lime-300 mb-2 uppercase tracking-[0.25em]">
              Portafolio
            </p>
            <h2 className="text-4xl font-black text-white">Proyectos destacados</h2>
            <p className="mt-4 text-stone-300 max-w-xl mx-auto">
              Una selección de proyectos reales donde combino desarrollo, diseño, análisis y visión de negocio.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group relative overflow-hidden rounded-[2rem] bg-white/[0.06] border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.25)] hover:border-lime-300/40 hover:-translate-y-2 transition-all duration-500 backdrop-blur-xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-xs text-lime-300 mb-1">{project.type}</p>
                    <h3 className="text-2xl font-black text-white">{project.title}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm leading-6 text-stone-300">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-lime-300/10 border border-lime-300/20 text-lime-200 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center mt-6 w-full rounded-full bg-white text-black py-3 text-sm font-bold hover:bg-lime-300 transition"
                  >
                    Ver proyecto →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#070b09]/80" />
        <div className="absolute right-[-160px] top-20 w-[500px] h-[500px] bg-lime-300/10 blur-[150px] rounded-full" />

        <div className="relative max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-12">
            Habilidades
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/[0.06] p-7 rounded-3xl border border-white/10 backdrop-blur-xl hover:border-lime-300/30 transition">
              <h3 className="text-xl font-bold mb-5 text-lime-300">Frontend</h3>
              <div className="flex flex-wrap gap-5 text-4xl">
                <FaHtml5 className="text-orange-500" />
                <FaCss3Alt className="text-blue-500" />
                <SiJavascript className="text-yellow-400" />
                <SiTypescript className="text-blue-500" />
                <FaReact className="text-cyan-400" />
                <SiTailwindcss className="text-sky-400" />
                <SiBootstrap className="text-purple-500" />
              </div>
            </div>

            <div className="bg-white/[0.06] p-7 rounded-3xl border border-white/10 backdrop-blur-xl hover:border-lime-300/30 transition">
              <h3 className="text-xl font-bold mb-5 text-lime-300">Backend</h3>
              <div className="flex flex-wrap gap-5 text-4xl">
                <FaNodeJs className="text-green-500" />
                <FaJava className="text-red-500" />
                <SiPython className="text-yellow-400" />
              </div>
            </div>

            <div className="bg-white/[0.06] p-7 rounded-3xl border border-white/10 backdrop-blur-xl hover:border-lime-300/30 transition">
              <h3 className="text-xl font-bold mb-5 text-lime-300">Base de datos</h3>
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg"
                alt="SQL Server"
                className="w-10 h-10"
              />
            </div>

            <div className="bg-white/[0.06] p-7 rounded-3xl border border-white/10 backdrop-blur-xl hover:border-lime-300/30 transition">
              <h3 className="text-xl font-bold mb-5 text-lime-300">Otros</h3>
              <img
                src="https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png"
                alt="Vercel"
                className="w-8 h-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contact" className="relative px-6 py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#10150f]/90 to-[#070b09]" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[400px] bg-lime-300/12 blur-[140px] rounded-full" />

        <div className="relative">
          <h2 className="text-4xl font-black mb-6">Contacto</h2>

          <p className="text-stone-300 mb-8">
            Disponible para oportunidades, proyectos y colaboraciones.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:Nelsonalvarez_0118@outlook.es"
              className="border border-white/15 px-5 py-3 rounded-full hover:bg-white hover:text-black transition"
            >
              Email
            </a>

            <a
              href="https://github.com/NelsonFau"
              target="_blank"
              rel="noreferrer"
              className="border border-white/15 px-5 py-3 rounded-full hover:bg-white hover:text-black transition"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/nelson-álvarez-18321321a"
              target="_blank"
              rel="noreferrer"
              className="border border-white/15 px-5 py-3 rounded-full hover:bg-white hover:text-black transition"
            >
              LinkedIn
            </a>

            <a
              href="/cv.pdf"
              download
              className="bg-lime-300 text-black px-5 py-3 rounded-full hover:bg-white transition font-bold shadow-[0_0_35px_rgba(190,242,100,0.22)]"
            >
              Descargar CV
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}