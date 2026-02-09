import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Heart, Radio, MessageCircle, BarChart3, Trophy, Ticket, Settings, CreditCard, LogOut, ArrowRight, Sparkles } from 'lucide-react';
import { getCurrentUser } from '../data/auth';

// ============================================================
// PLANES, BENEFICIOS, DATOS (same as before)
// ============================================================
interface Plan { id: string; name: string; priceARS: number; priceUSD: number; description: string; featured?: boolean; }

const plans: Plan[] = [
  { id: 'plan-a', name: 'Mate', priceARS: 2500, priceUSD: 4, description: 'Un empujoncito que suma mucho' },
  { id: 'plan-b', name: 'Soda', priceARS: 5000, priceUSD: 8, description: 'El que más eligen', featured: true },
  { id: 'plan-c', name: 'Sifón', priceARS: 12500, priceUSD: 20, description: 'Para los que quieren que esto crezca' },
];

const benefits = [
  '2 episodios extras por mes', 'Sorteos exclusivos', 'Historias más profundas',
  'Acceso anticipado', 'Tu Número de Socio', 'Comunidad privada',
  'Sin publicidad', 'RSS privado', 'Descuentos en la tienda', 'Ser parte real del proyecto',
];

// Data helpers (localStorage, en prod => Supabase)
const getLS = (key: string, def: any = []) => { try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(def)); } catch { return def; } };
const setLS = (key: string, val: any) => localStorage.setItem(key, JSON.stringify(val));

// ============================================================
// AURORA BOREAL EFFECT
// ============================================================
const AuroraEffect: React.FC = () => {
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Aurora 1 — rojo/magenta */}
      <motion.div className="absolute" style={{ left: '-10%', top: '-20%', width: '70%', height: '50%',
        background: 'radial-gradient(ellipse at 30% 50%, rgba(196,85,85,0.08) 0%, rgba(139,58,58,0.04) 40%, transparent 70%)',
        filter: 'blur(60px)', }}
        animate={{ x: [0, 80, -30, 0], y: [0, 30, -20, 0], opacity: [0.4, 0.7, 0.5, 0.4] }}
        transition={{ duration: isMobile ? 20 : 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Aurora 2 — azul/cyan */}
      <motion.div className="absolute" style={{ right: '-5%', top: '10%', width: '55%', height: '45%',
        background: 'radial-gradient(ellipse at 70% 40%, rgba(138,155,196,0.06) 0%, rgba(100,130,180,0.03) 40%, transparent 70%)',
        filter: 'blur(50px)', }}
        animate={{ x: [0, -60, 40, 0], y: [0, -30, 20, 0], opacity: [0.3, 0.6, 0.4, 0.3] }}
        transition={{ duration: isMobile ? 22 : 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      {/* Aurora 3 — verde tenue */}
      {!isMobile && <motion.div className="absolute" style={{ left: '20%', bottom: '0%', width: '60%', height: '35%',
        background: 'radial-gradient(ellipse at 50% 80%, rgba(80,180,120,0.04) 0%, transparent 60%)',
        filter: 'blur(50px)', }}
        animate={{ x: [0, 50, -30, 0], opacity: [0.2, 0.5, 0.3, 0.2] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />}
      {/* Rayos de luz verticales sutiles */}
      {!isMobile && [0, 1, 2].map(i => (
        <motion.div key={`ray-${i}`} className="absolute" style={{
          left: `${20 + i * 25}%`, top: 0, width: '1px', height: '100%',
          background: 'linear-gradient(to bottom, transparent, rgba(196,85,85,0.06), transparent 50%, rgba(138,155,196,0.04), transparent)',
        }}
          animate={{ opacity: [0, 0.5, 0], x: [0, 10, 0] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, delay: i * 3, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

// ============================================================
// SUBSCRIBER DASHBOARD — 3 columnas
// ============================================================
const SubscriberDashboard: React.FC = () => {
  const user = getCurrentUser();
  const [messages, setMessages] = useState<any[]>([]);
  const [polls, setPolls] = useState<any[]>([]);
  const [pollVotes, setPollVotes] = useState<Record<string, Record<string, number>>>({});
  const [userVotes, setUserVotes] = useState<Record<string, number>>({});
  const [raffles, setRaffles] = useState<any[]>([]);
  const [userTickets, setUserTickets] = useState<Record<string, number>>({});
  const [soditas, setSoditas] = useState(10);

  useEffect(() => {
    setMessages(getLS('sodaroja-internal-messages'));
    setPolls(getLS('sodaroja-polls'));
    setPollVotes(getLS('sodaroja-poll-votes', {}));
    setUserVotes(getLS('sodaroja-user-poll-votes', {}));
    setRaffles(getLS('sodaroja-raffles'));
    setUserTickets(getLS('sodaroja-user-tickets', {}));
    setSoditas(parseInt(localStorage.getItem('sodaroja-user-bubbles') || '10'));
  }, []);

  const listenedCount = useMemo(() => getLS('sodaroja-listened').length, []);
  const activePolls = polls.filter((p: any) => p.active);
  const activeRaffles = raffles.filter((r: any) => r.active);
  const currentPoll = activePolls[0];
  const currentRaffle = activeRaffles[0];

  const handleVote = (pollId: string, idx: number) => {
    if (userVotes[pollId] !== undefined) return;
    const nv = { ...pollVotes }; if (!nv[pollId]) nv[pollId] = {};
    nv[pollId][String(idx)] = (nv[pollId][String(idx)] || 0) + 1;
    setPollVotes(nv); setLS('sodaroja-poll-votes', nv);
    const nuv = { ...userVotes, [pollId]: idx }; setUserVotes(nuv); setLS('sodaroja-user-poll-votes', nuv);
  };

  const buyTicket = (raffleId: string) => {
    const cost = raffles.find((r: any) => r.id === raffleId)?.ticketCost || 1;
    if (soditas < cost) return;
    const ns = soditas - cost; setSoditas(ns); localStorage.setItem('sodaroja-user-bubbles', String(ns));
    const nt = { ...userTickets, [raffleId]: (userTickets[raffleId] || 0) + 1 }; setUserTickets(nt); setLS('sodaroja-user-tickets', nt);
  };

  return (
    <div className="space-y-8 relative" style={{ zIndex: 1 }}>
      {/* ===== HEADER — bienvenida + señal + soditas ===== */}
      <div className="text-center">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif text-soda-glow">Frecuencia Interna</h2>
          <p className="text-soda-lamp text-sm">Bienvenido/a, <span className="text-soda-red font-medium">{user?.name || 'suscriptor'}</span></p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <motion.div animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 bg-soda-red/10 border border-soda-red/30 rounded-sm px-4 py-1.5">
              <div className="w-2 h-2 bg-soda-red rounded-full" />
              <span className="text-soda-red text-xs tracking-wider font-medium">SEÑAL ACTIVA</span>
            </motion.div>
            <div className="inline-flex items-center gap-2 bg-soda-accent/10 border border-soda-accent/20 rounded-sm px-4 py-1.5">
              <span className="text-sm">🥤</span>
              <span className="text-soda-lamp text-sm font-medium">{soditas} soditas</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ===== GRID 3 COLUMNAS (desktop) / stack (mobile) ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ===== COLUMNA IZQUIERDA — Mi Plan ===== */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-soda-night/60 border border-soda-mist/15 rounded-sm p-5">
            <h3 className="text-soda-glow font-serif text-base mb-4 flex items-center gap-2"><Settings size={16} className="text-soda-accent" />Tu Plan</h3>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-soda-lamp font-medium">Plan Soda</div>
                <div className="text-soda-fog text-xs">$5.000 ARS / mes</div>
              </div>
              <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-sm px-2.5 py-1">
                <span className="text-emerald-400 text-[11px] font-medium">Activo</span>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Cambiar plan', icon: ArrowRight },
                { label: 'Cambiar medio de pago', icon: CreditCard },
                { label: 'Historial de pagos', icon: BarChart3 },
                { label: 'Dar de baja', icon: LogOut },
              ].map((opt, i) => {
                const Icon = opt.icon;
                return (
                  <button key={i} className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-sm text-soda-fog text-xs hover:text-soda-lamp hover:bg-soda-mist/5 transition-all">
                    <Icon size={13} className="text-soda-accent/60" />{opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stats compactas */}
          <div className="bg-soda-night/60 border border-soda-mist/15 rounded-sm p-4">
            <h4 className="text-soda-fog text-[11px] tracking-wider mb-3">TUS NÚMEROS</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { n: listenedCount, l: 'Episodios', emoji: '🎧' },
                { n: soditas, l: 'Soditas', emoji: '🥤' },
                { n: Object.keys(userVotes).length, l: 'Votos', emoji: '📊' },
                { n: Object.values(userTickets).reduce((a, b) => a + b, 0), l: 'Tickets', emoji: '🎟️' },
              ].map((s, i) => (
                <div key={i} className="text-center py-2">
                  <div className="text-soda-glow text-lg font-serif">{s.n}</div>
                  <div className="text-soda-fog text-[10px]">{s.emoji} {s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== COLUMNA CENTRAL — Encuesta + Sorteo ===== */}
        <div className="lg:col-span-5 space-y-4">
          {/* Encuesta activa */}
          <div className="bg-soda-night/60 border border-soda-accent/15 rounded-sm p-5">
            <h3 className="text-soda-glow font-serif text-base mb-1 flex items-center gap-2"><BarChart3 size={16} className="text-soda-accent" />Encuesta</h3>
            {currentPoll ? (() => {
              const voted = userVotes[currentPoll.id] !== undefined;
              const votes = pollVotes[currentPoll.id] || {};
              const total = Object.values(votes).reduce((a: number, b: any) => a + (b as number), 0) as number;
              return (
                <div className="mt-3">
                  <h4 className="text-soda-lamp text-sm font-medium mb-3">{currentPoll.question}</h4>
                  <div className="space-y-2">
                    {currentPoll.options.map((opt: string, idx: number) => {
                      const count = votes[String(idx)] || 0;
                      const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                      const isMyVote = userVotes[currentPoll.id] === idx;
                      return (
                        <button key={idx} onClick={() => handleVote(currentPoll.id, idx)} disabled={voted}
                          className={`w-full text-left relative rounded-sm overflow-hidden transition-all p-3 ${
                            voted ? 'cursor-default' : 'cursor-pointer hover:bg-soda-mist/5'
                          } border ${isMyVote ? 'border-soda-red/40 bg-soda-red/5' : 'border-soda-mist/10'}`}>
                          {voted && <div className="absolute inset-y-0 left-0 bg-soda-red/10 transition-all" style={{ width: `${pct}%` }} />}
                          <div className="relative flex justify-between items-center">
                            <span className={`text-sm ${isMyVote ? 'text-soda-lamp' : 'text-soda-fog'}`}>{opt}</span>
                            {voted && <span className="text-soda-fog text-xs ml-2">{pct}%</span>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {voted && <p className="text-soda-fog/40 text-[11px] mt-2">{total} voto{total !== 1 ? 's' : ''} · Tu voto fue registrado</p>}
                </div>
              );
            })() : (
              <div className="py-8 text-center">
                <p className="text-soda-fog text-sm">No hay encuestas activas.</p>
                <p className="text-soda-fog/40 text-xs mt-1">Pronto lanzamos una nueva.</p>
              </div>
            )}
          </div>

          {/* Sorteo activo */}
          <div className="bg-soda-night/60 border border-soda-red/15 rounded-sm overflow-hidden">
            {currentRaffle ? (
              <>
                {/* Banner del sorteo */}
                <div className="bg-gradient-to-r from-soda-red/15 via-soda-red/10 to-soda-accent/10 px-5 py-4 border-b border-soda-mist/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-soda-fog text-[10px] tracking-wider mb-1">SORTEO ACTIVO</div>
                      <h4 className="text-soda-glow font-serif text-lg">{currentRaffle.title}</h4>
                      <p className="text-soda-fog text-xs mt-1">{currentRaffle.description}</p>
                    </div>
                    <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-3xl">🎰</motion.div>
                  </div>
                </div>
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-soda-lamp text-sm">Tus tickets: <span className="text-soda-red font-bold text-base">{userTickets[currentRaffle.id] || 0}</span></div>
                      <div className="text-soda-fog/50 text-[11px]">Costo: {currentRaffle.ticketCost} 🥤 por ticket</div>
                    </div>
                    <button onClick={() => buyTicket(currentRaffle.id)} disabled={soditas < (currentRaffle.ticketCost || 1)}
                      className={`px-5 py-2.5 rounded-sm text-sm font-medium transition-all flex items-center gap-2 ${
                        soditas >= (currentRaffle.ticketCost || 1)
                          ? 'bg-soda-red/20 border border-soda-red/40 text-soda-lamp hover:bg-soda-red/30'
                          : 'border border-soda-mist/15 text-soda-fog/40 cursor-not-allowed'
                      }`}>
                      <Ticket size={14} />Comprar ticket
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="px-5 py-8 text-center">
                <Trophy size={28} className="text-soda-fog/20 mx-auto mb-3" />
                <p className="text-soda-fog text-sm">No hay sorteos activos.</p>
                <p className="text-soda-fog/40 text-xs mt-1">Guardá tus soditas 🥤</p>
              </div>
            )}
          </div>
        </div>

        {/* ===== COLUMNA DERECHA — Mensajes ===== */}
        <div className="lg:col-span-4 space-y-4">
          {/* Soditas header */}
          <div className="bg-gradient-to-r from-soda-red/10 to-soda-accent/10 border border-soda-mist/15 rounded-sm p-4 flex items-center gap-3">
            <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-2xl">🥤</motion.span>
            <div className="flex-1">
              <div className="text-soda-lamp font-medium text-sm">{soditas} soditas</div>
              <div className="text-soda-fog/50 text-[10px]">Ganás escuchando episodios · Canjealas en sorteos</div>
            </div>
          </div>

          {/* Feed de mensajes */}
          <div className="bg-soda-night/60 border border-soda-mist/15 rounded-sm">
            <div className="px-4 py-3 border-b border-soda-mist/10">
              <h3 className="text-soda-glow font-serif text-base flex items-center gap-2"><MessageCircle size={16} className="text-soda-accent" />Mensajes</h3>
            </div>
            <div className="max-h-72 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
              {messages.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <Radio size={24} className="text-soda-fog/20 mx-auto mb-2" />
                  <p className="text-soda-fog text-xs">Sin mensajes aún.</p>
                </div>
              ) : (
                <div className="divide-y divide-soda-mist/5">
                  {messages.slice().reverse().map((msg: any) => (
                    <div key={msg.id} className="px-4 py-3 hover:bg-soda-mist/3 transition-colors">
                      <div className="flex items-start gap-2.5">
                        <span className="text-sm flex-shrink-0 mt-0.5">{msg.emoji || '📡'}</span>
                        <div className="min-w-0">
                          <p className="text-soda-lamp text-sm leading-relaxed">{msg.text}</p>
                          <p className="text-soda-fog/30 text-[10px] mt-1">{new Date(msg.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// PUBLIC VIEW (no suscriptores — idéntica a la original)
// ============================================================
const PublicView: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('plan-b');
  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[1];
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);

  return (
    <>
      {[...Array(isMobile ? 3 : 6)].map((_, i) => (
        <motion.div key={`wave-${i}`} className="absolute left-1/2 top-1/2 border-2 border-soda-red rounded-full pointer-events-none"
          style={{ width: `${300 + i * 150}px`, height: `${300 + i * 150}px`, marginLeft: `-${150 + i * 75}px`, marginTop: `-${150 + i * 75}px` }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
      {[...Array(isMobile ? 4 : 20)].map((_, i) => (
        <motion.div key={`p-${i}`} className="absolute w-1 h-1 bg-soda-red rounded-full opacity-40"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ y: [0, -100, 0], x: [0, Math.random() * 50 - 25, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 3, repeat: Infinity }} className="inline-block mb-8">
            <div className="text-8xl text-soda-red">◉</div>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-serif text-soda-glow mb-6">Frecuencia Interna</h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-red to-transparent mx-auto mb-8" />
          <p className="text-soda-lamp text-xl font-light max-w-2xl mx-auto mb-8">Las historias que se cuentan cuando la noche ya está avanzada</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto mb-20">
          <p className="text-soda-fog text-base font-light leading-relaxed text-center">Sodaroja es un proyecto independiente que hacemos con amor, pero también con tiempo, energía y recursos. Cada episodio lleva horas de investigación, edición y producción. Tu aporte nos permite seguir haciéndolo.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-serif text-soda-glow mb-8 text-center lg:text-left">Elegí cómo querés sumarte</h3>
            <div className="space-y-6">
              {plans.map((plan, idx) => (
                <motion.div key={plan.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative bg-soda-night/50 rounded-sm p-8 transition-all duration-300 cursor-pointer ${
                    selectedPlan === plan.id ? 'border-2 border-soda-red shadow-lg shadow-soda-red/20 scale-[1.02]'
                    : plan.featured ? 'border-2 border-soda-accent shadow-lg shadow-soda-accent/10'
                    : 'border border-soda-mist/20 hover:border-soda-accent/40'
                  }`}>
                  <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === plan.id ? 'border-soda-red bg-soda-red' : 'border-soda-mist/40'}`}>
                    {selectedPlan === plan.id && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  {plan.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-soda-red px-4 py-1 rounded-sm text-xs tracking-wider text-soda-glow">MÁS ELEGIDO</div>}
                  <div className="flex items-end justify-between pr-8">
                    <div><h4 className="text-2xl font-serif text-soda-glow mb-2">{plan.name}</h4><p className="text-soda-fog text-sm">{plan.description}</p></div>
                    <div className="text-right"><div className="text-3xl font-light text-soda-lamp">${plan.priceARS.toLocaleString('es-AR')}</div><div className="text-sm text-soda-fog">USD ${plan.priceUSD}/mes</div></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-serif text-soda-glow mb-8 text-center lg:text-left">Qué te llevas al sumarte</h3>
            <div className="space-y-4">
              {benefits.map((b, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-6 h-6 rounded-sm border border-soda-accent/40 flex items-center justify-center group-hover:border-soda-red group-hover:bg-soda-red/10 transition-all"><Check size={14} className="text-soda-accent group-hover:text-soda-red" /></div>
                  <span className="text-soda-lamp font-light group-hover:text-soda-glow transition-colors">{b}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16">
          <div className="mb-6 text-center">
            <div className="text-soda-lamp text-sm mb-1">Plan seleccionado: <span className="text-soda-red font-medium">{currentPlan.name}</span></div>
            <div className="text-soda-fog text-xs">${currentPlan.priceARS.toLocaleString('es-AR')} ARS / USD ${currentPlan.priceUSD} por mes</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <button className="w-full sm:w-auto px-10 py-5 bg-soda-red/20 border-2 border-soda-red text-soda-glow rounded-sm hover:bg-soda-red/30 transition-all tracking-wider">
              <span className="flex items-center justify-center gap-2"><Heart size={18} />SUSCRIBIRME (ARGENTINA)</span>
              <span className="block text-xs text-soda-lamp mt-1 opacity-80">Mercado Pago · ${currentPlan.priceARS.toLocaleString('es-AR')} ARS/mes</span>
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-soda-accent/15 border-2 border-soda-accent text-soda-glow rounded-sm hover:bg-soda-accent/25 transition-all tracking-wider">
              <span className="flex items-center justify-center gap-2"><Heart size={18} />SUSCRIBIRME (INTERNACIONAL)</span>
              <span className="block text-xs text-soda-lamp mt-1 opacity-80">USD ${currentPlan.priceUSD}/mes</span>
            </button>
          </div>
          <p className="text-soda-fog text-xs mt-8 font-light text-center">Cancelá cuando quieras, sin compromiso ni letra chica</p>
        </motion.div>
      </div>
    </>
  );
};

// ============================================================
// MAIN
// ============================================================
export const FrecuenciaInterna: React.FC = () => {
  const user = getCurrentUser();
  const isPremium = user?.isPremium === true;

  return (
    <section id="frecuencia-interna" className="relative py-32 px-6 bg-gradient-to-b from-soda-night via-soda-deep to-soda-night overflow-hidden">
      {isPremium && <AuroraEffect />}
      {isPremium ? (
        <div className="max-w-7xl mx-auto relative z-10"><SubscriberDashboard /></div>
      ) : (
        <PublicView />
      )}
    </section>
  );
};
