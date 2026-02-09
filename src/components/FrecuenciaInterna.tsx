import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Heart, Radio, MessageCircle, BarChart3, Trophy, Ticket, Send, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { getCurrentUser } from '../data/auth';

// ============================================================
// PLANES Y BENEFICIOS (editables desde admin)
// ============================================================
interface SubscriptionPlan {
  id: string; name: string; priceARS: number; priceUSD: number; description: string; featured?: boolean;
}

const plans: SubscriptionPlan[] = [
  { id: 'plan-a', name: 'Mate', priceARS: 2500, priceUSD: 4, description: 'Un empujoncito que suma mucho' },
  { id: 'plan-b', name: 'Soda', priceARS: 5000, priceUSD: 8, description: 'El que más eligen los que nos bancan', featured: true },
  { id: 'plan-c', name: 'Sifón', priceARS: 12500, priceUSD: 20, description: 'Para los que quieren que esto crezca en serio' },
];

const benefits = [
  '2 episodios extras por mes', 'Sorteos exclusivos entre suscriptores', 'Historias más profundas e investigadas',
  'Acceso anticipado a lanzamientos', 'Participación en futuros episodios', 'Tu Número de Socio Efervescente',
  'Comunidad privada', 'Sin publicidad', 'RSS privado para tu app favorita',
  'Descuentos en la tienda', 'Nos ayudás a mejorar el equipo', 'Ser parte real del proyecto',
];

const sectionTitle = 'Frecuencia Interna';
const sectionSubtitle = 'Las historias que se cuentan cuando la noche ya está avanzada';
const sectionIntro = 'Sodaroja es un proyecto independiente que hacemos con amor, pero también con tiempo, energía y recursos. Cada episodio lleva horas de investigación, edición y producción. Tu aporte nos permite seguir haciéndolo.';
const cancelNote = 'Cancelá cuando quieras, sin compromiso ni letra chica';

// ============================================================
// DATOS INTERNOS (en producción viene de Supabase)
// ============================================================
interface InternalMessage { id: string; text: string; date: string; emoji?: string; }
interface Poll { id: string; question: string; options: string[]; active: boolean; }
interface Raffle { id: string; title: string; description: string; active: boolean; ticketCost: number; }

const getInternalMessages = (): InternalMessage[] => {
  try { return JSON.parse(localStorage.getItem('sodaroja-internal-messages') || '[]'); } catch { return []; }
};
const saveInternalMessages = (msgs: InternalMessage[]) => {
  localStorage.setItem('sodaroja-internal-messages', JSON.stringify(msgs));
};

const getPolls = (): Poll[] => {
  try { return JSON.parse(localStorage.getItem('sodaroja-polls') || '[]'); } catch { return []; }
};
const savePolls = (p: Poll[]) => { localStorage.setItem('sodaroja-polls', JSON.stringify(p)); };

const getPollVotes = (): Record<string, Record<string, number>> => {
  try { return JSON.parse(localStorage.getItem('sodaroja-poll-votes') || '{}'); } catch { return {}; }
};
const getUserPollVotes = (): Record<string, number> => {
  try { return JSON.parse(localStorage.getItem('sodaroja-user-poll-votes') || '{}'); } catch { return {}; }
};

const getRaffles = (): Raffle[] => {
  try { return JSON.parse(localStorage.getItem('sodaroja-raffles') || '[]'); } catch { return []; }
};
const saveRaffles = (r: Raffle[]) => { localStorage.setItem('sodaroja-raffles', JSON.stringify(r)); };

const getUserTickets = (): Record<string, number> => {
  try { return JSON.parse(localStorage.getItem('sodaroja-user-tickets') || '{}'); } catch { return {}; }
};

const getUserBubbles = (): number => {
  try { return parseInt(localStorage.getItem('sodaroja-user-bubbles') || '10'); } catch { return 10; }
};
const setUserBubbles = (n: number) => { localStorage.setItem('sodaroja-user-bubbles', String(n)); };

// ============================================================
// SUBSCRIBER DASHBOARD
// ============================================================
const SubscriberDashboard: React.FC = () => {
  const user = getCurrentUser();
  const [messages, setMessages] = useState<InternalMessage[]>([]);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [pollVotes, setPollVotes] = useState<Record<string, Record<string, number>>>({});
  const [userVotes, setUserVotes] = useState<Record<string, number>>({});
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [userTickets, setUserTickets] = useState<Record<string, number>>({});
  const [bubbles, setBubbles] = useState(10);
  const [activeTab, setActiveTab] = useState<'feed' | 'polls' | 'raffles' | 'stats'>('feed');

  useEffect(() => {
    setMessages(getInternalMessages());
    setPolls(getPolls());
    setPollVotes(getPollVotes());
    setUserVotes(getUserPollVotes());
    setRaffles(getRaffles());
    setUserTickets(getUserTickets());
    setBubbles(getUserBubbles());
  }, []);

  // Estadísticas
  const listenedCount = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('sodaroja-listened') || '[]').length; } catch { return 0; }
  }, []);

  const handleVote = (pollId: string, optionIdx: number) => {
    if (userVotes[pollId] !== undefined) return;
    const newVotes = { ...pollVotes };
    if (!newVotes[pollId]) newVotes[pollId] = {};
    newVotes[pollId][String(optionIdx)] = (newVotes[pollId][String(optionIdx)] || 0) + 1;
    setPollVotes(newVotes);
    localStorage.setItem('sodaroja-poll-votes', JSON.stringify(newVotes));
    const newUserVotes = { ...userVotes, [pollId]: optionIdx };
    setUserVotes(newUserVotes);
    localStorage.setItem('sodaroja-user-poll-votes', JSON.stringify(newUserVotes));
  };

  const buyTicket = (raffleId: string) => {
    const cost = raffles.find(r => r.id === raffleId)?.ticketCost || 1;
    if (bubbles < cost) return;
    setBubbles(b => { const n = b - cost; setUserBubbles(n); return n; });
    const newTickets = { ...userTickets, [raffleId]: (userTickets[raffleId] || 0) + 1 };
    setUserTickets(newTickets);
    localStorage.setItem('sodaroja-user-tickets', JSON.stringify(newTickets));
  };

  const tabs = [
    { id: 'feed' as const, label: 'Mensajes', icon: MessageCircle },
    { id: 'polls' as const, label: 'Encuestas', icon: BarChart3 },
    { id: 'raffles' as const, label: 'Sorteos', icon: Trophy },
    { id: 'stats' as const, label: 'Mi Cuenta', icon: Star },
  ];

  const activePolls = polls.filter(p => p.active);
  const activeRaffles = raffles.filter(r => r.active);

  return (
    <div className="space-y-8">
      {/* Bienvenida */}
      <div className="text-center">
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }} className="inline-block mb-4">
          <div className="text-6xl">◉</div>
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-serif text-soda-glow mb-3">Frecuencia Interna</h2>
        <p className="text-soda-lamp text-sm">Bienvenido/a, <span className="text-soda-red">{user?.name || 'suscriptor'}</span></p>
        <div className="inline-flex items-center gap-2 mt-3 bg-soda-red/10 border border-soda-red/30 rounded-sm px-4 py-1.5">
          <div className="w-2 h-2 bg-soda-red rounded-full animate-pulse" />
          <span className="text-soda-red text-xs tracking-wider font-medium">SEÑAL ACTIVA</span>
        </div>
      </div>

      {/* Burbujas (moneda interna) */}
      <div className="flex justify-center">
        <div className="bg-soda-night/60 border border-soda-accent/20 rounded-sm px-5 py-2.5 flex items-center gap-3">
          <span className="text-lg">🫧</span>
          <div>
            <div className="text-soda-lamp text-sm font-medium">{bubbles} burbujas</div>
            <div className="text-soda-fog text-[10px]">Moneda interna · úsalas en sorteos</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-1 bg-soda-night/40 rounded-sm p-1 max-w-lg mx-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-sm text-xs transition-all ${
                isActive ? 'bg-soda-red/20 text-soda-lamp border border-soda-red/30' : 'text-soda-fog hover:text-soda-lamp'
              }`}>
              <Icon size={14} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Contenido de tabs */}
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

          {/* FEED DE MENSAJES */}
          {activeTab === 'feed' && (
            <div className="max-w-2xl mx-auto space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-16">
                  <Radio size={40} className="text-soda-fog mx-auto mb-4 opacity-30" />
                  <p className="text-soda-fog text-sm">Todavía no hay mensajes.</p>
                  <p className="text-soda-fog/60 text-xs mt-1">Cuando publiquemos algo, lo vas a ver acá primero.</p>
                </div>
              ) : (
                messages.slice().reverse().map(msg => (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-soda-night/50 border border-soda-mist/15 rounded-sm p-5 group hover:border-soda-red/20 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-soda-red/20 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-sm">{msg.emoji || '📡'}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-soda-lamp text-sm leading-relaxed">{msg.text}</p>
                        <p className="text-soda-fog/50 text-[11px] mt-2">{new Date(msg.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {/* ENCUESTAS */}
          {activeTab === 'polls' && (
            <div className="max-w-2xl mx-auto space-y-6">
              {activePolls.length === 0 ? (
                <div className="text-center py-16">
                  <BarChart3 size={40} className="text-soda-fog mx-auto mb-4 opacity-30" />
                  <p className="text-soda-fog text-sm">No hay encuestas activas.</p>
                  <p className="text-soda-fog/60 text-xs mt-1">Cuando lancemos una encuesta, vas a poder votar acá.</p>
                </div>
              ) : (
                activePolls.map(poll => {
                  const voted = userVotes[poll.id] !== undefined;
                  const votes = pollVotes[poll.id] || {};
                  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
                  return (
                    <div key={poll.id} className="bg-soda-night/50 border border-soda-accent/20 rounded-sm p-6">
                      <h4 className="text-soda-glow font-serif text-lg mb-4">{poll.question}</h4>
                      <div className="space-y-2.5">
                        {poll.options.map((opt, idx) => {
                          const count = votes[String(idx)] || 0;
                          const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
                          const isMyVote = userVotes[poll.id] === idx;
                          return (
                            <button key={idx} onClick={() => handleVote(poll.id, idx)} disabled={voted}
                              className={`w-full text-left relative rounded-sm overflow-hidden transition-all ${
                                voted ? 'cursor-default' : 'cursor-pointer hover:border-soda-red/40'
                              } border ${isMyVote ? 'border-soda-red/50' : 'border-soda-mist/15'} p-3`}>
                              {voted && (
                                <div className="absolute inset-0 bg-soda-red/10 rounded-sm" style={{ width: `${pct}%` }} />
                              )}
                              <div className="relative flex justify-between items-center">
                                <span className={`text-sm ${isMyVote ? 'text-soda-lamp font-medium' : 'text-soda-fog'}`}>{opt}</span>
                                {voted && <span className="text-soda-fog text-xs">{pct}%</span>}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      {voted && <p className="text-soda-fog/50 text-[11px] mt-3">{totalVotes} voto{totalVotes !== 1 ? 's' : ''}</p>}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* SORTEOS */}
          {activeTab === 'raffles' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center mb-4">
                <p className="text-soda-fog text-xs">Tus burbujas: <span className="text-soda-lamp font-medium">{bubbles} 🫧</span></p>
              </div>
              {activeRaffles.length === 0 ? (
                <div className="text-center py-16">
                  <Trophy size={40} className="text-soda-fog mx-auto mb-4 opacity-30" />
                  <p className="text-soda-fog text-sm">No hay sorteos activos.</p>
                  <p className="text-soda-fog/60 text-xs mt-1">Guardá tus burbujas para cuando haya uno.</p>
                </div>
              ) : (
                activeRaffles.map(raffle => {
                  const myTickets = userTickets[raffle.id] || 0;
                  const canBuy = bubbles >= raffle.ticketCost;
                  return (
                    <div key={raffle.id} className="bg-soda-night/50 border border-soda-accent/20 rounded-sm p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-soda-glow font-serif text-lg">{raffle.title}</h4>
                          <p className="text-soda-fog text-sm mt-1">{raffle.description}</p>
                        </div>
                        <div className="flex-shrink-0 text-2xl">🎰</div>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-soda-mist/10">
                        <div>
                          <div className="text-soda-lamp text-sm">Tus tickets: <span className="text-soda-red font-bold">{myTickets}</span></div>
                          <div className="text-soda-fog/60 text-[11px]">Costo: {raffle.ticketCost} 🫧 por ticket</div>
                        </div>
                        <button onClick={() => buyTicket(raffle.id)} disabled={!canBuy}
                          className={`px-4 py-2 rounded-sm text-xs font-medium transition-all flex items-center gap-1.5 ${
                            canBuy ? 'bg-soda-red/20 border border-soda-red/40 text-soda-lamp hover:bg-soda-red/30' : 'border border-soda-mist/15 text-soda-fog/40 cursor-not-allowed'
                          }`}>
                          <Ticket size={14} />
                          Comprar ticket
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
              <p className="text-soda-fog/40 text-[10px] text-center">Cada burbuja = 1 chance más. Ganás burbujas escuchando episodios y participando.</p>
            </div>
          )}

          {/* ESTADÍSTICAS */}
          {activeTab === 'stats' && (
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-soda-night/50 border border-soda-mist/15 rounded-sm p-5 text-center">
                  <div className="text-3xl font-serif text-soda-glow mb-1">{listenedCount}</div>
                  <div className="text-soda-fog text-xs">Episodios escuchados</div>
                </div>
                <div className="bg-soda-night/50 border border-soda-mist/15 rounded-sm p-5 text-center">
                  <div className="text-3xl font-serif text-soda-glow mb-1">{bubbles}</div>
                  <div className="text-soda-fog text-xs">Burbujas 🫧</div>
                </div>
                <div className="bg-soda-night/50 border border-soda-mist/15 rounded-sm p-5 text-center">
                  <div className="text-3xl font-serif text-soda-glow mb-1">{Object.keys(userVotes).length}</div>
                  <div className="text-soda-fog text-xs">Encuestas votadas</div>
                </div>
                <div className="bg-soda-night/50 border border-soda-mist/15 rounded-sm p-5 text-center">
                  <div className="text-3xl font-serif text-soda-glow mb-1">{Object.values(userTickets).reduce((a, b) => a + b, 0)}</div>
                  <div className="text-soda-fog text-xs">Tickets de sorteo</div>
                </div>
              </div>

              {/* Gestión de plan */}
              <div className="bg-soda-night/50 border border-soda-red/20 rounded-sm p-6">
                <h4 className="text-soda-glow font-serif text-lg mb-4">Tu plan</h4>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-soda-lamp font-medium">Plan Soda</div>
                    <div className="text-soda-fog text-xs">$5.000 ARS / mes</div>
                  </div>
                  <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-sm px-3 py-1">
                    <span className="text-emerald-400 text-xs font-medium">Activo</span>
                  </div>
                </div>
                <button className="w-full py-2.5 border border-soda-mist/20 rounded-sm text-soda-fog text-xs hover:border-soda-accent/30 hover:text-soda-lamp transition-all">
                  Cambiar de plan
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ============================================================
// PUBLIC VIEW (para no suscriptores)
// ============================================================
const PublicView: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('plan-b');
  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[1];
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);

  return (
    <>
      {/* Ondas de frecuencia de fondo */}
      {[...Array(isMobile ? 3 : 6)].map((_, i) => (
        <motion.div key={`wave-${i}`} className="absolute left-1/2 top-1/2 border-2 border-soda-red rounded-full pointer-events-none"
          style={{ width: `${300 + i * 150}px`, height: `${300 + i * 150}px`, marginLeft: `-${150 + i * 75}px`, marginTop: `-${150 + i * 75}px` }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      {/* Partículas */}
      {[...Array(isMobile ? 4 : 20)].map((_, i) => (
        <motion.div key={`p-${i}`} className="absolute w-1 h-1 bg-soda-red rounded-full opacity-40"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ y: [0, -100, 0], x: [0, Math.random() * 50 - 25, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 3, repeat: Infinity }} className="inline-block mb-8">
            <div className="text-8xl text-soda-red">◉</div>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-serif text-soda-glow mb-6">{sectionTitle}</h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-red to-transparent mx-auto mb-8" />
          <p className="text-soda-lamp text-xl font-light max-w-2xl mx-auto mb-8">{sectionSubtitle}</p>
        </motion.div>

        {/* Intro */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto mb-20">
          <p className="text-soda-fog text-base font-light leading-relaxed text-center">{sectionIntro}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Planes */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-serif text-soda-glow mb-8 text-center lg:text-left">Elegí cómo querés sumarte</h3>
            <div className="space-y-6">
              {plans.map((plan, index) => (
                <motion.div key={plan.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative bg-soda-night/50 rounded-sm p-8 transition-all duration-300 cursor-pointer ${
                    selectedPlan === plan.id ? 'border-2 border-soda-red shadow-lg shadow-soda-red/20 scale-[1.02]'
                    : plan.featured ? 'border-2 border-soda-accent shadow-lg shadow-soda-accent/10'
                    : 'border border-soda-mist/20 hover:border-soda-accent/40'
                  }`}>
                  <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedPlan === plan.id ? 'border-soda-red bg-soda-red' : 'border-soda-mist/40'
                  }`}>
                    {selectedPlan === plan.id && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-soda-red px-4 py-1 rounded-sm text-xs tracking-wider text-soda-glow">MÁS ELEGIDO</div>
                  )}
                  <div className="flex items-end justify-between mb-4 pr-8">
                    <div>
                      <h4 className="text-2xl font-serif text-soda-glow mb-2">{plan.name}</h4>
                      <p className="text-soda-fog text-sm">{plan.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-light text-soda-lamp">${plan.priceARS.toLocaleString('es-AR')}</div>
                      <div className="text-sm text-soda-fog">USD ${plan.priceUSD}/mes</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Beneficios */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-serif text-soda-glow mb-8 text-center lg:text-left">Qué te llevas al sumarte</h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-6 h-6 rounded-sm border border-soda-accent/40 flex items-center justify-center group-hover:border-soda-red group-hover:bg-soda-red/10 transition-all">
                    <Check size={14} className="text-soda-accent group-hover:text-soda-red transition-colors" />
                  </div>
                  <span className="text-soda-lamp font-light group-hover:text-soda-glow transition-colors">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Botones */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16">
          <div className="mb-6 text-center">
            <div className="text-soda-lamp text-sm mb-1">Plan seleccionado: <span className="text-soda-red font-medium">{currentPlan.name}</span></div>
            <div className="text-soda-fog text-xs">${currentPlan.priceARS.toLocaleString('es-AR')} ARS / USD ${currentPlan.priceUSD} por mes</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto px-10 py-5 bg-soda-red/20 border-2 border-soda-red text-soda-glow rounded-sm hover:bg-soda-red/30 transition-all text-base tracking-wider relative overflow-hidden group">
              <span className="relative z-10 flex items-center justify-center gap-2"><Heart size={18} />SUSCRIBIRME (ARGENTINA)</span>
              <span className="relative z-10 block text-xs text-soda-lamp mt-1 opacity-80">Mercado Pago · ${currentPlan.priceARS.toLocaleString('es-AR')} ARS/mes</span>
            </motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto px-10 py-5 bg-soda-accent/15 border-2 border-soda-accent text-soda-glow rounded-sm hover:bg-soda-accent/25 transition-all text-base tracking-wider relative overflow-hidden group">
              <span className="relative z-10 flex items-center justify-center gap-2"><Heart size={18} />SUSCRIBIRME (INTERNACIONAL)</span>
              <span className="relative z-10 block text-xs text-soda-lamp mt-1 opacity-80">USD ${currentPlan.priceUSD}/mes</span>
            </motion.button>
          </div>
          <p className="text-soda-fog text-xs mt-8 font-light text-center">{cancelNote}</p>
        </motion.div>
      </div>
    </>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export const FrecuenciaInterna: React.FC = () => {
  const user = getCurrentUser();
  const isPremium = user?.isPremium === true;

  return (
    <section id="frecuencia-interna" className="relative py-32 px-6 bg-gradient-to-b from-soda-night via-soda-deep to-soda-night overflow-hidden">
      {isPremium ? (
        <div className="max-w-7xl mx-auto relative z-10">
          <SubscriberDashboard />
        </div>
      ) : (
        <PublicView />
      )}
    </section>
  );
};
