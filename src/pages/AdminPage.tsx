import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Radio, ShoppingBag, Mic, Settings, Eye, Save, Plus, Trash2, Image, AlertCircle, Home, HelpCircle, Mail, ChevronDown, ChevronUp, ToggleLeft, ToggleRight, UserCog, Layout } from 'lucide-react';
import { getContent, saveContent, SiteContent } from '../data/content';

const ADMIN_PASSWORD = 'sodaroja2026';

type AdminTab = 'inicio' | 'queesesto' | 'equipo' | 'episodios' | 'frecuencia' | 'shop' | 'contacto' | 'general' | 'micuenta' | 'secciones';

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('inicio');
  const [saved, setSaved] = useState(false);
  const [content, setContent] = useState<SiteContent>(getContent());
  const [expandedMember, setExpandedMember] = useState<number | null>(null);
  const [showNewEpisode, setShowNewEpisode] = useState(false);
  const [newEpisode, setNewEpisode] = useState({ id: '', city: '', title: '', description: '', imageUrl: '', publishDate: '', isPremium: false, links: { youtube: '', spotify: '', soundcloud: '', ivoox: '', applePodcasts: '' }, embeds: { spotify: '', soundcloud: '', ivoox: '', applePodcasts: '' } });

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) { setIsAuthenticated(true); setError(''); } else { setError('Contraseña incorrecta'); }
  };

  const handleSave = () => {
    saveContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (path: string, value: any) => {
    const keys = path.split('.');
    const newContent = JSON.parse(JSON.stringify(content));
    let obj: any = newContent;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    setContent(newContent);
  };

  const ic = "w-full bg-soda-night bg-opacity-80 border border-soda-mist border-opacity-30 rounded-sm px-4 py-3 text-soda-lamp focus:border-soda-accent focus:outline-none transition-colors text-sm";
  const lc = "block text-soda-lamp text-sm mb-2 font-medium";
  const nc = "text-soda-fog text-xs mt-1";
  const cc = "bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-6 mb-6";

  if (!isAuthenticated) {
    return (
      <section className="relative pt-32 pb-24 px-6 min-h-screen flex items-center justify-center restore-cursor">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
          <div className={cc}>
            <div className="text-center mb-8">
              <Shield size={48} className="text-soda-red mx-auto mb-4" />
              <h1 className="text-3xl font-serif text-soda-glow mb-2">Admin Panel</h1>
              <p className="text-soda-fog text-sm">sodaroja — Panel de Administración</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className={lc}>Contraseña</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} className={ic} placeholder="Ingresá la contraseña" />
              </div>
              {error && <div className="flex items-center gap-2 text-soda-red text-sm"><AlertCircle size={14} /><span>{error}</span></div>}
              <button onClick={handleLogin} className="w-full py-3 bg-soda-red bg-opacity-20 border border-soda-red text-soda-glow rounded-sm hover:bg-opacity-30 transition-all text-sm tracking-wider">ENTRAR</button>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: 'inicio', label: 'Inicio', icon: <Home size={16} /> },
    { id: 'queesesto', label: 'Qué es esto', icon: <HelpCircle size={16} /> },
    { id: 'equipo', label: 'El Equipo', icon: <Users size={16} /> },
    { id: 'episodios', label: 'Episodios', icon: <Mic size={16} /> },
    { id: 'frecuencia', label: 'Frecuencia Interna', icon: <Radio size={16} /> },
    { id: 'shop', label: 'Shop', icon: <ShoppingBag size={16} /> },
    { id: 'contacto', label: 'Contacto', icon: <Mail size={16} /> },
    { id: 'micuenta', label: 'Mi Cuenta (campos)', icon: <UserCog size={16} /> },
    { id: 'secciones', label: 'Nombres Secciones', icon: <Layout size={16} /> },
    { id: 'general', label: 'General / Redes', icon: <Settings size={16} /> },
  ];

  const addEpisode = () => {
    const ep = { ...newEpisode, id: `ep-${Date.now()}` };
    update('episodios.items', [...content.episodios.items, ep]);
    setNewEpisode({ id: '', city: '', title: '', description: '', imageUrl: '', publishDate: '', isPremium: false, links: { youtube: '', spotify: '', soundcloud: '', ivoox: '', applePodcasts: '' }, embeds: { spotify: '', soundcloud: '', ivoox: '', applePodcasts: '' } });
    setShowNewEpisode(false);
  };

  return (
    <section className="relative pt-32 pb-24 px-6 min-h-screen restore-cursor">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-serif text-soda-glow mb-2">Admin Panel</h1>
            <p className="text-soda-fog text-sm">Gestión de contenido de sodaroja</p>
          </div>
          <div className="flex items-center gap-3">
            {saved && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-sm">✓ Guardado</motion.span>}
            <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 bg-soda-red bg-opacity-20 border border-soda-red text-soda-glow rounded-sm hover:bg-opacity-30 transition-all text-sm"><Save size={16} />Guardar</button>
            <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 border border-soda-accent text-soda-accent rounded-sm hover:bg-soda-accent hover:bg-opacity-10 transition-all text-sm"><Eye size={16} />Ver Sitio</a>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-sm text-xs transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-soda-red bg-opacity-20 border border-soda-red text-soda-glow' : 'border border-soda-mist border-opacity-20 text-soda-fog hover:text-soda-lamp hover:border-opacity-40'}`}>
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>

        {/* ======== INICIO ======== */}
        {activeTab === 'inicio' && (
          <div>
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Pantalla de Inicio (Hero)</h2>
              <div className="space-y-4">
                <div><label className={lc}>Título principal</label><input type="text" value={content.hero.title} onChange={(e) => update('hero.title', e.target.value)} className={ic} /></div>
                <div><label className={lc}>Subtítulo</label><input type="text" value={content.hero.subtitle} onChange={(e) => update('hero.subtitle', e.target.value)} className={ic} /></div>
                <div><label className={lc}>Descripción</label><textarea rows={3} value={content.hero.description} onChange={(e) => update('hero.description', e.target.value)} className={ic + ' resize-y'} /></div>
                <div><label className={lc}>URL de imagen principal (opcional, reemplaza la animación)</label><input type="text" value={content.hero.imageUrl} onChange={(e) => update('hero.imageUrl', e.target.value)} className={ic} placeholder="https://..." /><p className={nc}>Dejá vacío para usar la animación del dial de frecuencia</p></div>
              </div>
            </div>
          </div>
        )}

        {/* ======== QUÉ ES ESTO ======== */}
        {activeTab === 'queesesto' && (
          <div>
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Textos Principales</h2>
              <div className="space-y-4">
                <div><label className={lc}>Título</label><input type="text" value={content.queEsEsto.title} onChange={(e) => update('queEsEsto.title', e.target.value)} className={ic} /></div>
                <div><label className={lc}>Descripción</label><textarea rows={3} value={content.queEsEsto.description} onChange={(e) => update('queEsEsto.description', e.target.value)} className={ic + ' resize-y'} /></div>
                <div><label className={lc}>Título de estructura</label><input type="text" value={content.queEsEsto.structureTitle} onChange={(e) => update('queEsEsto.structureTitle', e.target.value)} className={ic} /></div>
                <div><label className={lc}>Subtítulo de estructura</label><input type="text" value={content.queEsEsto.structureSubtitle} onChange={(e) => update('queEsEsto.structureSubtitle', e.target.value)} className={ic} /></div>
              </div>
            </div>
            <div className={cc}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-serif text-soda-glow">Pasos / Estructura</h2>
                <button onClick={() => update('queEsEsto.estructura', [...content.queEsEsto.estructura, { numero: String(content.queEsEsto.estructura.length), emoji: '⭐', titulo: 'Nuevo paso', descripcion: '', detalles: '', destacado: false, color: 'accent' }])} className="flex items-center gap-1 px-3 py-2 border border-soda-accent text-soda-accent rounded-sm text-xs hover:bg-soda-accent hover:bg-opacity-10"><Plus size={14} />Agregar paso</button>
              </div>
              <p className={nc + ' mb-4'}>Podés editar el número, emoji, color y contenido de cada paso. Arrastrá para reordenar.</p>
              {content.queEsEsto.estructura.map((paso, idx) => (
                <div key={idx} className="border border-soda-mist border-opacity-15 rounded-sm p-4 mb-3">
                  <div className="grid grid-cols-12 gap-3 mb-3">
                    <div className="col-span-2"><label className={lc}>Número</label><input type="text" value={paso.numero} onChange={(e) => { const arr = [...content.queEsEsto.estructura]; arr[idx] = { ...arr[idx], numero: e.target.value }; update('queEsEsto.estructura', arr); }} className={ic} /></div>
                    <div className="col-span-2"><label className={lc}>Emoji</label><input type="text" value={paso.emoji} onChange={(e) => { const arr = [...content.queEsEsto.estructura]; arr[idx] = { ...arr[idx], emoji: e.target.value }; update('queEsEsto.estructura', arr); }} className={ic} /></div>
                    <div className="col-span-3"><label className={lc}>Color</label>
                      <select value={paso.color} onChange={(e) => { const arr = [...content.queEsEsto.estructura]; arr[idx] = { ...arr[idx], color: e.target.value as any }; update('queEsEsto.estructura', arr); }} className={ic}>
                        <option value="red">Rojo</option><option value="accent">Azul</option><option value="lamp">Dorado</option><option value="glow">Blanco</option>
                      </select>
                    </div>
                    <div className="col-span-3"><label className={lc}>Destacado</label>
                      <button onClick={() => { const arr = [...content.queEsEsto.estructura]; arr[idx] = { ...arr[idx], destacado: !arr[idx].destacado }; update('queEsEsto.estructura', arr); }} className="flex items-center gap-2 text-sm mt-1">
                        {paso.destacado ? <ToggleRight size={24} className="text-soda-red" /> : <ToggleLeft size={24} className="text-soda-fog" />}
                        <span className={paso.destacado ? 'text-soda-red' : 'text-soda-fog'}>{paso.destacado ? 'Sí' : 'No'}</span>
                      </button>
                    </div>
                    <div className="col-span-2 flex items-end"><button onClick={() => { const arr = content.queEsEsto.estructura.filter((_, i) => i !== idx); update('queEsEsto.estructura', arr); }} className="text-soda-red text-xs hover:underline mb-3">Eliminar</button></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div><label className={lc}>Título</label><input type="text" value={paso.titulo} onChange={(e) => { const arr = [...content.queEsEsto.estructura]; arr[idx] = { ...arr[idx], titulo: e.target.value }; update('queEsEsto.estructura', arr); }} className={ic} /></div>
                    <div><label className={lc}>Subtítulo (opcional)</label><input type="text" value={paso.subtitulo || ''} onChange={(e) => { const arr = [...content.queEsEsto.estructura]; arr[idx] = { ...arr[idx], subtitulo: e.target.value }; update('queEsEsto.estructura', arr); }} className={ic} /></div>
                  </div>
                  <div className="space-y-3">
                    <div><label className={lc}>Descripción</label><textarea rows={2} value={paso.descripcion} onChange={(e) => { const arr = [...content.queEsEsto.estructura]; arr[idx] = { ...arr[idx], descripcion: e.target.value }; update('queEsEsto.estructura', arr); }} className={ic + ' resize-y'} /></div>
                    <div><label className={lc}>Detalles</label><textarea rows={2} value={paso.detalles} onChange={(e) => { const arr = [...content.queEsEsto.estructura]; arr[idx] = { ...arr[idx], detalles: e.target.value }; update('queEsEsto.estructura', arr); }} className={ic + ' resize-y'} /></div>
                  </div>
                </div>
              ))}
            </div>
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Temas</h2>
              {content.queEsEsto.temas.map((tema, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <input type="text" value={tema} onChange={(e) => { const arr = [...content.queEsEsto.temas]; arr[idx] = e.target.value; update('queEsEsto.temas', arr); }} className={ic + ' flex-1'} />
                  <button onClick={() => update('queEsEsto.temas', content.queEsEsto.temas.filter((_, i) => i !== idx))} className="text-soda-red p-1"><Trash2 size={14} /></button>
                </div>
              ))}
              <button onClick={() => update('queEsEsto.temas', [...content.queEsEsto.temas, 'Nuevo tema'])} className="mt-2 flex items-center gap-1 text-soda-accent text-xs"><Plus size={14} />Agregar tema</button>
            </div>
          </div>
        )}

        {/* ======== EL EQUIPO ======== */}
        {activeTab === 'equipo' && (
          <div>
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Configuración</h2>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={lc}>Título</label><input type="text" value={content.equipo.title} onChange={(e) => update('equipo.title', e.target.value)} className={ic} /></div>
                <div><label className={lc}>Subtítulo</label><input type="text" value={content.equipo.subtitle} onChange={(e) => update('equipo.subtitle', e.target.value)} className={ic} /></div>
              </div>
            </div>

            <div className={cc}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-serif text-soda-glow">Integrantes</h2>
                <button onClick={() => update('equipo.members', [...content.equipo.members, { name: 'Nuevo', role: 'Rol', birthYear: 2000, cityBorn: '', cityCurrent: '', zodiac: '', photoUrl: '', socials: [], favorites: {}, cities: {} }])} className="flex items-center gap-1 px-3 py-2 border border-soda-accent text-soda-accent rounded-sm text-xs"><Plus size={14} />Agregar</button>
              </div>
              <div className="bg-soda-night bg-opacity-40 border border-soda-mist border-opacity-10 rounded-sm p-3 mb-4">
                <div className="flex items-center gap-2 text-soda-accent text-xs"><Image size={14} /><span>Fotos: 600×800px mínimo (ratio 3:4), JPG/WebP, max 500KB</span></div>
              </div>

              {content.equipo.members.map((member, mIdx) => (
                <div key={mIdx} className="border border-soda-mist border-opacity-15 rounded-sm mb-4 overflow-hidden">
                  <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-soda-mist hover:bg-opacity-5" onClick={() => setExpandedMember(expandedMember === mIdx ? null : mIdx)}>
                    <div className="flex items-center gap-3">
                      <span className="text-soda-lamp font-medium">{member.name}</span>
                      <span className="text-soda-fog text-xs">— {member.role}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={(e) => { e.stopPropagation(); update('equipo.members', content.equipo.members.filter((_, i) => i !== mIdx)); }} className="text-soda-red text-xs hover:underline">Eliminar</button>
                      {expandedMember === mIdx ? <ChevronUp size={16} className="text-soda-fog" /> : <ChevronDown size={16} className="text-soda-fog" />}
                    </div>
                  </div>

                  {expandedMember === mIdx && (
                    <div className="p-4 pt-0 space-y-4 border-t border-soda-mist border-opacity-10">
                      <div className="grid grid-cols-3 gap-3">
                        <div><label className={lc}>Nombre</label><input type="text" value={member.name} onChange={(e) => { const arr = [...content.equipo.members]; arr[mIdx] = { ...arr[mIdx], name: e.target.value }; update('equipo.members', arr); }} className={ic} /></div>
                        <div><label className={lc}>Rol</label><input type="text" value={member.role} onChange={(e) => { const arr = [...content.equipo.members]; arr[mIdx] = { ...arr[mIdx], role: e.target.value }; update('equipo.members', arr); }} className={ic} /></div>
                        <div><label className={lc}>URL foto</label><input type="text" value={member.photoUrl} onChange={(e) => { const arr = [...content.equipo.members]; arr[mIdx] = { ...arr[mIdx], photoUrl: e.target.value }; update('equipo.members', arr); }} className={ic} /></div>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        <div><label className={lc}>Año nacimiento</label><input type="number" value={member.birthYear} onChange={(e) => { const arr = [...content.equipo.members]; arr[mIdx] = { ...arr[mIdx], birthYear: Number(e.target.value) }; update('equipo.members', arr); }} className={ic} /></div>
                        <div><label className={lc}>Ciudad natal</label><input type="text" value={member.cityBorn} onChange={(e) => { const arr = [...content.equipo.members]; arr[mIdx] = { ...arr[mIdx], cityBorn: e.target.value }; update('equipo.members', arr); }} className={ic} /></div>
                        <div><label className={lc}>Vive en</label><input type="text" value={member.cityCurrent} onChange={(e) => { const arr = [...content.equipo.members]; arr[mIdx] = { ...arr[mIdx], cityCurrent: e.target.value }; update('equipo.members', arr); }} className={ic} /></div>
                        <div><label className={lc}>Signo</label><input type="text" value={member.zodiac} onChange={(e) => { const arr = [...content.equipo.members]; arr[mIdx] = { ...arr[mIdx], zodiac: e.target.value }; update('equipo.members', arr); }} className={ic} /></div>
                      </div>

                      {/* CUESTIONARIO INDIVIDUAL — Perfil Humano */}
                      <div>
                        <h4 className="text-soda-accent text-sm font-medium mb-3 mt-2">📋 Perfil Humano — {member.name}</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {content.equipo.favoriteFields.map((field) => (
                            <div key={field.key}>
                              <label className={lc}>{field.label}</label>
                              <input type="text" value={String(member.favorites[field.key] || '')} onChange={(e) => { const arr = [...content.equipo.members]; arr[mIdx] = { ...arr[mIdx], favorites: { ...arr[mIdx].favorites, [field.key]: e.target.value } }; update('equipo.members', arr); }} className={ic} placeholder={`Respuesta de ${member.name}`} />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CUESTIONARIO INDIVIDUAL — Ciudades */}
                      <div>
                        <h4 className="text-soda-accent text-sm font-medium mb-3 mt-2">🌍 Ciudades — {member.name}</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {content.equipo.cityFields.map((field) => (
                            <div key={field.key}>
                              <label className={lc}>{field.label}</label>
                              <input type="text" value={member.cities[field.key] || ''} onChange={(e) => { const arr = [...content.equipo.members]; arr[mIdx] = { ...arr[mIdx], cities: { ...arr[mIdx].cities, [field.key]: e.target.value } }; update('equipo.members', arr); }} className={ic} placeholder={`Respuesta de ${member.name}`} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======== EPISODIOS ======== */}
        {activeTab === 'episodios' && (
          <div>
            <div className={cc}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-serif text-soda-glow">Episodios ({content.episodios.items.length})</h2>
                <button onClick={() => setShowNewEpisode(!showNewEpisode)} className="flex items-center gap-2 px-4 py-2 border border-soda-accent text-soda-accent rounded-sm text-sm hover:bg-soda-accent hover:bg-opacity-10">{showNewEpisode ? 'Cancelar' : <><Plus size={16} />Nuevo Episodio</>}</button>
              </div>

              {showNewEpisode && (
                <div className="border-2 border-soda-accent border-opacity-30 rounded-sm p-5 mb-6 bg-soda-night bg-opacity-40">
                  <h3 className="text-soda-accent text-sm font-medium mb-4">Nuevo Episodio</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div><label className={lc}>Ciudad</label><input type="text" value={newEpisode.city} onChange={(e) => setNewEpisode({ ...newEpisode, city: e.target.value })} className={ic} placeholder="Ej: Buenos Aires" /></div>
                    <div><label className={lc}>Título</label><input type="text" value={newEpisode.title} onChange={(e) => setNewEpisode({ ...newEpisode, title: e.target.value })} className={ic} placeholder="Ej: La Dama de Blanco" /></div>
                  </div>
                  <div className="mb-4"><label className={lc}>Descripción</label><textarea rows={2} value={newEpisode.description} onChange={(e) => setNewEpisode({ ...newEpisode, description: e.target.value })} className={ic + ' resize-y'} placeholder="Breve descripción del episodio" /></div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div><label className={lc}>Fecha (YYYY-MM-DD)</label><input type="date" value={newEpisode.publishDate} onChange={(e) => setNewEpisode({ ...newEpisode, publishDate: e.target.value })} className={ic} /></div>
                    <div><label className={lc}>URL Imagen (800×600px)</label><input type="text" value={newEpisode.imageUrl} onChange={(e) => setNewEpisode({ ...newEpisode, imageUrl: e.target.value })} className={ic} placeholder="https://..." /></div>
                    <div><label className={lc}>Premium</label>
                      <button onClick={() => setNewEpisode({ ...newEpisode, isPremium: !newEpisode.isPremium })} className="flex items-center gap-2 text-sm mt-1">
                        {newEpisode.isPremium ? <ToggleRight size={24} className="text-soda-red" /> : <ToggleLeft size={24} className="text-soda-fog" />}
                        <span>{newEpisode.isPremium ? 'Sí (Frecuencia Interna)' : 'No (público)'}</span>
                      </button>
                    </div>
                  </div>
                  <h4 className="text-soda-lamp text-sm mb-3 mt-2">Links (URLs directas)</h4>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div><label className={lc}>YouTube (link)</label><input type="text" value={newEpisode.links.youtube} onChange={(e) => setNewEpisode({ ...newEpisode, links: { ...newEpisode.links, youtube: e.target.value } })} className={ic} placeholder="https://youtube.com/..." /></div>
                    <div><label className={lc}>Spotify (link)</label><input type="text" value={newEpisode.links.spotify} onChange={(e) => setNewEpisode({ ...newEpisode, links: { ...newEpisode.links, spotify: e.target.value } })} className={ic} placeholder="https://open.spotify.com/..." /></div>
                    <div><label className={lc}>SoundCloud (link)</label><input type="text" value={newEpisode.links.soundcloud} onChange={(e) => setNewEpisode({ ...newEpisode, links: { ...newEpisode.links, soundcloud: e.target.value } })} className={ic} placeholder="https://soundcloud.com/..." /></div>
                    <div><label className={lc}>iVoox (link)</label><input type="text" value={newEpisode.links.ivoox} onChange={(e) => setNewEpisode({ ...newEpisode, links: { ...newEpisode.links, ivoox: e.target.value } })} className={ic} placeholder="https://ivoox.com/..." /></div>
                    <div><label className={lc}>Apple Podcasts (link)</label><input type="text" value={newEpisode.links.applePodcasts || ''} onChange={(e) => setNewEpisode({ ...newEpisode, links: { ...newEpisode.links, applePodcasts: e.target.value } })} className={ic} placeholder="https://podcasts.apple.com/..." /></div>
                  </div>
                  <h4 className="text-soda-lamp text-sm mb-3">Embeds (URLs de iframe — se ven dentro del modal del episodio)</h4>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div><label className={lc}>Embed Spotify</label><input type="text" value={newEpisode.embeds.spotify} onChange={(e) => setNewEpisode({ ...newEpisode, embeds: { ...newEpisode.embeds, spotify: e.target.value } })} className={ic} placeholder="https://open.spotify.com/embed/..." /></div>
                    <div><label className={lc}>Embed SoundCloud</label><input type="text" value={newEpisode.embeds.soundcloud} onChange={(e) => setNewEpisode({ ...newEpisode, embeds: { ...newEpisode.embeds, soundcloud: e.target.value } })} className={ic} placeholder="https://w.soundcloud.com/player/..." /></div>
                    <div><label className={lc}>Embed iVoox</label><input type="text" value={newEpisode.embeds.ivoox} onChange={(e) => setNewEpisode({ ...newEpisode, embeds: { ...newEpisode.embeds, ivoox: e.target.value } })} className={ic} placeholder="https://www.ivoox.com/player_..." /></div>
                    <div><label className={lc}>Embed Apple Podcasts</label><input type="text" value={newEpisode.embeds.applePodcasts || ''} onChange={(e) => setNewEpisode({ ...newEpisode, embeds: { ...newEpisode.embeds, applePodcasts: e.target.value } })} className={ic} placeholder="https://embed.podcasts.apple.com/..." /><p className={nc}>Apple tiene embed, copiá la URL del widget</p></div>
                  </div>
                  <button onClick={addEpisode} className="w-full py-3 bg-soda-accent bg-opacity-20 border border-soda-accent text-soda-glow rounded-sm hover:bg-opacity-30 transition-all text-sm">Crear Episodio</button>
                </div>
              )}

              {content.episodios.items.map((ep, idx) => (
                <div key={ep.id} className="flex items-center justify-between border border-soda-mist border-opacity-15 rounded-sm p-4 mb-3">
                  <div className="flex items-center gap-4">
                    <span className="text-soda-accent text-xs font-mono w-8">{idx + 1}</span>
                    <div>
                      <p className="text-soda-lamp text-sm">{ep.city} — {ep.title}</p>
                      <p className="text-soda-fog text-xs">{ep.publishDate} {ep.isPremium && '• 🔒 Premium'}</p>
                    </div>
                  </div>
                  <button onClick={() => update('episodios.items', content.episodios.items.filter((_, i) => i !== idx))} className="text-soda-red text-xs hover:underline">Eliminar</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======== FRECUENCIA INTERNA ======== */}
        {activeTab === 'frecuencia' && (
          <div>
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Textos</h2>
              <div className="space-y-4">
                <div><label className={lc}>Título</label><input type="text" value={content.frecuenciaInterna.title} onChange={(e) => update('frecuenciaInterna.title', e.target.value)} className={ic} /></div>
                <div><label className={lc}>Subtítulo</label><input type="text" value={content.frecuenciaInterna.subtitle} onChange={(e) => update('frecuenciaInterna.subtitle', e.target.value)} className={ic} /></div>
                <div><label className={lc}>Texto introductorio</label><textarea rows={4} value={content.frecuenciaInterna.introText} onChange={(e) => update('frecuenciaInterna.introText', e.target.value)} className={ic + ' resize-y'} /></div>
              </div>
            </div>
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Planes</h2>
              <p className={nc + ' mb-4'}>⚠️ Al modificar los precios acá, se actualizan los montos mostrados. Asegurate de que coincidan con los precios en Mercado Pago / PayPal.</p>
              {content.frecuenciaInterna.plans.map((plan, idx) => (
                <div key={plan.id} className="border border-soda-mist border-opacity-15 rounded-sm p-4 mb-3">
                  <div className="grid grid-cols-5 gap-3">
                    <div><label className={lc}>Nombre</label><input type="text" value={plan.name} onChange={(e) => { const arr = [...content.frecuenciaInterna.plans]; arr[idx] = { ...arr[idx], name: e.target.value }; update('frecuenciaInterna.plans', arr); }} className={ic} /></div>
                    <div><label className={lc}>ARS $</label><input type="number" value={plan.priceARS} onChange={(e) => { const arr = [...content.frecuenciaInterna.plans]; arr[idx] = { ...arr[idx], priceARS: Number(e.target.value) }; update('frecuenciaInterna.plans', arr); }} className={ic} /></div>
                    <div><label className={lc}>USD $</label><input type="number" value={plan.priceUSD} onChange={(e) => { const arr = [...content.frecuenciaInterna.plans]; arr[idx] = { ...arr[idx], priceUSD: Number(e.target.value) }; update('frecuenciaInterna.plans', arr); }} className={ic} /></div>
                    <div><label className={lc}>Descripción</label><input type="text" value={plan.description} onChange={(e) => { const arr = [...content.frecuenciaInterna.plans]; arr[idx] = { ...arr[idx], description: e.target.value }; update('frecuenciaInterna.plans', arr); }} className={ic} /></div>
                    <div><label className={lc}>Destacado</label><button onClick={() => { const arr = [...content.frecuenciaInterna.plans]; arr[idx] = { ...arr[idx], featured: !arr[idx].featured }; update('frecuenciaInterna.plans', arr); }} className="flex items-center gap-1 mt-1">{plan.featured ? <ToggleRight size={24} className="text-soda-red" /> : <ToggleLeft size={24} className="text-soda-fog" />}</button></div>
                  </div>
                </div>
              ))}
            </div>
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">URLs de Pago</h2>
              <p className={nc + ' mb-4'}>Las suscripciones las gestiona directamente Mercado Pago / PayPal. Vos solo ponés el link y ellos se encargan de cobrar y gestionar.</p>
              <div className="space-y-4">
                <div><label className={lc}>URL Mercado Pago (Argentina — cobro en ARS)</label><input type="text" value={content.frecuenciaInterna.paymentUrls.mercadoPago} onChange={(e) => update('frecuenciaInterna.paymentUrls.mercadoPago', e.target.value)} className={ic} placeholder="https://www.mercadopago.com.ar/subscriptions/..." /><p className={nc}>Creá una suscripción en Mercado Pago → Copiá el link acá</p></div>
                <div><label className={lc}>Plataforma internacional</label>
                  <select value={content.frecuenciaInterna.paymentUrls.internationalProvider} onChange={(e) => update('frecuenciaInterna.paymentUrls.internationalProvider', e.target.value)} className={ic}>
                    <option value="paypal">PayPal (más conocido, acepta casi todo el mundo)</option>
                    <option value="stripe">Stripe (más profesional, necesita más setup)</option>
                    <option value="lemon-squeezy">Lemon Squeezy (fácil, bueno para creadores)</option>
                  </select>
                  <p className={nc}>PayPal es la opción más accesible para suscripciones internacionales. El usuario paga con tarjeta o PayPal directo.</p>
                </div>
                <div><label className={lc}>URL Internacional (cobro en USD)</label><input type="text" value={content.frecuenciaInterna.paymentUrls.international} onChange={(e) => update('frecuenciaInterna.paymentUrls.international', e.target.value)} className={ic} placeholder="https://www.paypal.com/..." /></div>
              </div>
            </div>
          </div>
        )}

        {/* ======== SHOP ======== */}
        {activeTab === 'shop' && (
          <div>
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Configuración del Shop</h2>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={lc}>Título</label><input type="text" value={content.shop.title} onChange={(e) => update('shop.title', e.target.value)} className={ic} /></div>
                <div><label className={lc}>Subtítulo</label><input type="text" value={content.shop.subtitle} onChange={(e) => update('shop.subtitle', e.target.value)} className={ic} /></div>
              </div>
            </div>
          </div>
        )}

        {/* ======== CONTACTO ======== */}
        {activeTab === 'contacto' && (
          <div>
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Contacto</h2>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={lc}>Título</label><input type="text" value={content.contacto.title} onChange={(e) => update('contacto.title', e.target.value)} className={ic} /></div>
                <div><label className={lc}>Subtítulo</label><input type="text" value={content.contacto.subtitle} onChange={(e) => update('contacto.subtitle', e.target.value)} className={ic} /></div>
                <div><label className={lc}>Email</label><input type="email" value={content.contacto.email} onChange={(e) => update('contacto.email', e.target.value)} className={ic} /></div>
                <div><label className={lc}>Instagram</label><input type="text" value={content.contacto.instagram} onChange={(e) => update('contacto.instagram', e.target.value)} className={ic} /></div>
              </div>
            </div>
          </div>
        )}

        {/* ======== MI CUENTA — CAMPOS ======== */}
        {activeTab === 'micuenta' && (
          <div>
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Campos del Perfil de Usuario</h2>
              <p className={nc + ' mb-4'}>Configurá qué datos les pedís a los usuarios cuando se registran. Podés agregar campos tipo texto o tipo selección (dropdown).</p>
              {content.userProfileFields.map((field, idx) => (
                <div key={field.id} className="border border-soda-mist border-opacity-15 rounded-sm p-4 mb-3">
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-3"><label className={lc}>Nombre del campo</label><input type="text" value={field.label} onChange={(e) => { const arr = [...content.userProfileFields]; arr[idx] = { ...arr[idx], label: e.target.value }; update('userProfileFields', arr); }} className={ic} /></div>
                    <div className="col-span-2"><label className={lc}>Tipo</label>
                      <select value={field.type} onChange={(e) => { const arr = [...content.userProfileFields]; arr[idx] = { ...arr[idx], type: e.target.value as any }; update('userProfileFields', arr); }} className={ic}>
                        <option value="text">Texto libre</option><option value="select">Selección (dropdown)</option><option value="month-year">Mes y año</option>
                      </select>
                    </div>
                    <div className="col-span-2"><label className={lc}>Visible</label>
                      <button onClick={() => { const arr = [...content.userProfileFields]; arr[idx] = { ...arr[idx], visible: !arr[idx].visible }; update('userProfileFields', arr); }} className="flex items-center gap-1 mt-1">
                        {field.visible ? <ToggleRight size={24} className="text-green-400" /> : <ToggleLeft size={24} className="text-soda-fog" />}
                      </button>
                    </div>
                    <div className="col-span-2"><label className={lc}>Obligatorio</label>
                      <button onClick={() => { const arr = [...content.userProfileFields]; arr[idx] = { ...arr[idx], required: !arr[idx].required }; update('userProfileFields', arr); }} className="flex items-center gap-1 mt-1">
                        {field.required ? <ToggleRight size={24} className="text-soda-red" /> : <ToggleLeft size={24} className="text-soda-fog" />}
                      </button>
                    </div>
                    <div className="col-span-2"><label className={lc}>Placeholder</label><input type="text" value={field.placeholder || ''} onChange={(e) => { const arr = [...content.userProfileFields]; arr[idx] = { ...arr[idx], placeholder: e.target.value }; update('userProfileFields', arr); }} className={ic} /></div>
                    <div className="col-span-1 flex items-end pb-3"><button onClick={() => update('userProfileFields', content.userProfileFields.filter((_, i) => i !== idx))} className="text-soda-red"><Trash2 size={14} /></button></div>
                  </div>
                  {field.type === 'select' && (
                    <div className="mt-3">
                      <label className={lc}>Opciones (una por línea)</label>
                      <textarea rows={3} value={(field.options || []).join('\n')} onChange={(e) => { const arr = [...content.userProfileFields]; arr[idx] = { ...arr[idx], options: e.target.value.split('\n').filter(Boolean) }; update('userProfileFields', arr); }} className={ic + ' resize-y'} placeholder="Opción 1&#10;Opción 2&#10;Opción 3" />
                    </div>
                  )}
                </div>
              ))}
              <button onClick={() => update('userProfileFields', [...content.userProfileFields, { id: `field-${Date.now()}`, label: 'Nuevo campo', type: 'text', required: false, visible: true, placeholder: '' }])} className="flex items-center gap-1 text-soda-accent text-xs mt-2"><Plus size={14} />Agregar campo</button>
            </div>
          </div>
        )}

        {/* ======== NOMBRES DE SECCIONES ======== */}
        {activeTab === 'secciones' && (
          <div>
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Nombres de las Secciones</h2>
              <p className={nc + ' mb-4'}>Al cambiar estos nombres, se actualizan automáticamente en el menú de navegación (header) del sitio.</p>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(content.sectionNames).map(([key, value]) => (
                  <div key={key}>
                    <label className={lc}>{key}</label>
                    <input type="text" value={value} onChange={(e) => update(`sectionNames.${key}`, e.target.value)} className={ic} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======== GENERAL / REDES ======== */}
        {activeTab === 'general' && (
          <div>
            <div className={cc}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-serif text-soda-glow">Redes Sociales (Footer)</h2>
                <button onClick={() => update('socialLinks', [...content.socialLinks, { id: `social-${Date.now()}`, platform: 'Nueva red', abbr: 'NR', url: '#', visible: true }])} className="flex items-center gap-1 px-3 py-2 border border-soda-accent text-soda-accent rounded-sm text-xs"><Plus size={14} />Agregar red</button>
              </div>
              <p className={nc + ' mb-4'}>Elegí cuáles mostrar, cambiá las siglas (2 letras que aparecen en el footer), y agregá o quitá redes.</p>
              {content.socialLinks.map((link, idx) => (
                <div key={link.id} className="flex items-center gap-3 mb-3">
                  <button onClick={() => { const arr = [...content.socialLinks]; arr[idx] = { ...arr[idx], visible: !arr[idx].visible }; update('socialLinks', arr); }} className="flex-shrink-0">
                    {link.visible ? <ToggleRight size={24} className="text-green-400" /> : <ToggleLeft size={24} className="text-soda-fog" />}
                  </button>
                  <input type="text" value={link.platform} onChange={(e) => { const arr = [...content.socialLinks]; arr[idx] = { ...arr[idx], platform: e.target.value }; update('socialLinks', arr); }} className={ic + ' w-40'} placeholder="Nombre" />
                  <input type="text" value={link.abbr} onChange={(e) => { const arr = [...content.socialLinks]; arr[idx] = { ...arr[idx], abbr: e.target.value.substring(0, 3) }; update('socialLinks', arr); }} className={ic + ' w-20'} placeholder="XX" maxLength={3} />
                  <input type="text" value={link.url} onChange={(e) => { const arr = [...content.socialLinks]; arr[idx] = { ...arr[idx], url: e.target.value }; update('socialLinks', arr); }} className={ic + ' flex-1'} placeholder="https://..." />
                  <button onClick={() => update('socialLinks', content.socialLinks.filter((_, i) => i !== idx))} className="text-soda-red flex-shrink-0"><Trash2 size={14} /></button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
