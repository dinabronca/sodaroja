import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Youtube } from 'lucide-react';

export const Contacto: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrar con backend cuando esté listo
    // Por ahora abre el cliente de email
    window.location.href = `mailto:hola@sodaroja.com?subject=Contacto de ${formData.name}&body=${formData.message}`;
  };

  return (
    <section id="contacto" className="relative py-32 px-6 bg-gradient-to-b from-soda-night to-soda-deep">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif text-soda-glow mb-6">
            Contacto
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-accent to-transparent mx-auto mb-8" />
          <p className="text-soda-lamp text-lg font-light">
            ¿Tenés una historia para contar? ¿Querés colaborar? Hablemos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-soda-lamp text-sm mb-2">Tu nombre</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm px-4 py-3 text-soda-lamp focus:border-soda-accent focus:outline-none transition-colors"
                  placeholder="Juan Pérez"
                />
              </div>

              <div>
                <label className="block text-soda-lamp text-sm mb-2">Tu email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm px-4 py-3 text-soda-lamp focus:border-soda-accent focus:outline-none transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-soda-lamp text-sm mb-2">Mensaje</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={6}
                  className="w-full bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm px-4 py-3 text-soda-lamp focus:border-soda-accent focus:outline-none transition-colors resize-none"
                  placeholder="Contanos tu idea..."
                />
              </div>

              <button
                type="submit"
                className="glow-button hoverable w-full py-4 bg-soda-accent bg-opacity-20 border border-soda-accent text-soda-lamp rounded-sm hover:bg-opacity-30 transition-all duration-300 tracking-wider"
              >
                ENVIAR MENSAJE
              </button>
            </form>
          </motion.div>

          {/* Info de contacto */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-8">
              <h3 className="text-xl font-serif text-soda-glow mb-6">También podés encontrarnos en</h3>
              
              <div className="space-y-4">
                <a
                  href="mailto:hola@sodaroja.com"
                  className="hoverable flex items-center gap-4 text-soda-lamp hover:text-soda-glow transition-colors group"
                >
                  <Mail size={24} className="text-soda-accent group-hover:text-soda-lamp transition-colors" />
                  <span>hola@sodaroja.com</span>
                </a>

                <a
                  href="https://instagram.com/sodaroja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hoverable flex items-center gap-4 text-soda-lamp hover:text-soda-glow transition-colors group"
                >
                  <Instagram size={24} className="text-soda-accent group-hover:text-soda-lamp transition-colors" />
                  <span>@sodaroja</span>
                </a>

                <a
                  href="https://youtube.com/@sodaroja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hoverable flex items-center gap-4 text-soda-lamp hover:text-soda-glow transition-colors group"
                >
                  <Youtube size={24} className="text-soda-accent group-hover:text-soda-lamp transition-colors" />
                  <span>@sodaroja</span>
                </a>
              </div>
            </div>

            <p className="text-soda-fog text-sm font-light">
              Respondemos todos los mensajes. Puede que tarde un poco, pero llegamos.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
