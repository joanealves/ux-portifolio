'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, Linkedin,   } from 'lucide-react';

export default function ContactPage() {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData);

    try {
      const res = await fetch('https://formspree.io/f/mdkgorla', {
        method: 'POST',
        body: JSON.stringify(formObject),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

      const data = await res.json();

      if (res.ok) {
        setShowModal(true);
        e.target.reset();
      } else {
        setError(data.error || 'Erro ao enviar. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar:', error);
      setError('Erro na requisição. Verifique sua conexão.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-background text-foreground px-6 md:px-24 py-24 flex items-center">
      <div 
        className="absolute top-1/4 -left-24 w-64 h-64 rounded-full opacity-50 blur-3xl"
        style={{ backgroundColor: "hsl(252, 87%, 64%)" }} 
      ></div>
      <div 
        className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full opacity-50 blur-3xl"
        style={{ backgroundColor: "hsl(191, 97%, 77%)" }} 
      ></div>

      <div className="w-full max-w-3xl mx-auto space-y-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Vamos conversar?</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Tem um projeto ou quer trocar ideias? Me envie uma mensagem ou conecte no LinkedIn.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">Nome</label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full rounded-lg bg-muted text-foreground px-4 py-3 outline-none border border-border focus:ring-2 focus:ring-primary"
              placeholder="Seu nome"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full rounded-lg bg-muted text-foreground px-4 py-3 outline-none border border-border focus:ring-2 focus:ring-primary"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium">Mensagem</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full rounded-lg bg-muted text-foreground px-4 py-3 outline-none border border-border focus:ring-2 focus:ring-primary"
              placeholder="Escreva sua mensagem..."
              required
            />
          </div>

          {error && (
            <div className="text-red-500 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-glow px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition hover:opacity-90 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>Enviando...</>
            ) : (
              <>
                <Send size={18} /> Enviar mensagem
              </>
            )}
          </button>
        </motion.form>

        <div className="pt-10 flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/joane-alves-ribeiro" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center gap-2"
            aria-label='Conectar pelo Linkedin'
          >
            Conectar pelo LinkedIn
          </a>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-card text-card-foreground rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Mail size={40} className="mx-auto text-primary mb-4" />
              <h2 className="text-2xl font-bold mb-2">Mensagem enviada!</h2>
              <p className="text-muted-foreground">Logo entrarei em contato com você 💜</p>

              <button
                onClick={() => setShowModal(false)}
                className="mt-6 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90"
              >
                Fechar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}