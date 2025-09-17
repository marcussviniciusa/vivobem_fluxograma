// Sistema CODIVAR - Interface Moderna com Motion.dev
// JavaScript otimizado para animações fluidas e performance

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se Motion está disponível
    if (typeof Motion === 'undefined') {
        console.warn('Motion.dev não carregado, usando fallback CSS');
        initializeFallbackAnimations();
        return;
    }

    console.log('🚀 Iniciando interface moderna CODIVAR com Motion.dev');

    initializeModernAnimations();
    initializeTimelineInteractions();
    initializeScrollAnimations();
    initializeMicroInteractions();
});

// Animações modernas com Motion.dev
function initializeModernAnimations() {
    const { animate, spring, timeline } = Motion;

    // Animação de entrada do header
    timeline([
        ['.header .main-logo', {
            opacity: [0, 1],
            y: [-50, 0],
            scale: [0.8, 1]
        }, {
            duration: 0.8,
            ease: spring({ stiffness: 200, damping: 20 })
        }],
        ['.main-title', {
            opacity: [0, 1],
            y: [30, 0]
        }, {
            duration: 0.6,
            ease: "ease-out",
            at: 0.2
        }],
        ['.subtitle', {
            opacity: [0, 1],
            y: [20, 0]
        }, {
            duration: 0.5,
            ease: "ease-out",
            at: 0.4
        }]
    ]);

    // Animação fluida dos benefit items
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach((item, index) => {
        animate(item, {
            opacity: [0, 1],
            x: [-30, 0],
            scale: [0.95, 1]
        }, {
            duration: 0.6,
            delay: 0.1 * index,
            ease: spring({ stiffness: 300, damping: 25 })
        });
    });

    // Cards da timeline com animação escalonada
    const timelineCards = document.querySelectorAll('.timeline-card');
    timelineCards.forEach((card, index) => {
        animate(card, {
            opacity: [0, 1],
            y: [40, 0],
            rotateX: [10, 0]
        }, {
            duration: 0.7,
            delay: 0.15 * index,
            ease: spring({ stiffness: 200, damping: 30 })
        });
    });
}

// Interações da timeline com Motion
function initializeTimelineInteractions() {
    const { animate, spring } = Motion;
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
        const card = item.querySelector('.timeline-card');
        const marker = item.querySelector('.timeline-marker');

        if (card && marker) {
            // Hover com spring physics
            card.addEventListener('mouseenter', () => {
                animate(card, {
                    y: -8,
                    scale: 1.02,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }, {
                    duration: 0.3,
                    ease: spring({ stiffness: 400, damping: 30 })
                });

                animate(marker, {
                    scale: 1.15,
                    borderWidth: '6px'
                }, {
                    duration: 0.2,
                    ease: "ease-out"
                });
            });

            card.addEventListener('mouseleave', () => {
                animate(card, {
                    y: 0,
                    scale: 1,
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }, {
                    duration: 0.3,
                    ease: spring({ stiffness: 400, damping: 30 })
                });

                animate(marker, {
                    scale: 1,
                    borderWidth: '4px'
                }, {
                    duration: 0.2,
                    ease: "ease-out"
                });
            });

            // Click com feedback visual
            card.addEventListener('click', () => {
                // Efeito de pulse
                animate(card, {
                    scale: [1, 0.98, 1]
                }, {
                    duration: 0.2,
                    ease: "ease-in-out"
                });

                // Mostrar modal com animação
                showModernModal(item, index + 1);
            });
        }
    });
}

// Modal moderno com animações fluidas
function showModernModal(item, stepNumber) {
    const { animate, spring } = Motion;

    // Remover modal existente
    const existingModal = document.querySelector('.modern-modal');
    if (existingModal) {
        closeModal(existingModal);
        return;
    }

    const cardTitle = item.querySelector('.card-header h3').textContent;
    const cardIcon = item.querySelector('.card-icon').textContent;
    const cardBody = item.querySelector('.card-body').innerHTML;

    const modal = document.createElement('div');
    modal.className = 'modern-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-container">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-icon">${cardIcon}</div>
                    <h3>Etapa ${stepNumber}: ${cardTitle}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${cardBody}
                    <div class="modal-details">
                        <h4>Especificações Técnicas:</h4>
                        ${getModalDetails(stepNumber)}
                    </div>
                </div>
            </div>
        </div>
    `;

    // Estilos do modal moderno
    addModernModalStyles();

    document.body.appendChild(modal);

    // Animação de entrada com Motion
    animate(modal.querySelector('.modal-backdrop'), {
        opacity: [0, 1]
    }, {
        duration: 0.3,
        ease: "ease-out"
    });

    animate(modal.querySelector('.modal-container'), {
        opacity: [0, 1],
        scale: [0.9, 1],
        y: [20, 0]
    }, {
        duration: 0.4,
        ease: spring({ stiffness: 300, damping: 30 })
    });

    // Event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => closeModal(modal));
    modal.querySelector('.modal-backdrop').addEventListener('click', () => closeModal(modal));

    function closeModal(modalElement) {
        animate(modalElement.querySelector('.modal-container'), {
            opacity: 0,
            scale: 0.95,
            y: -10
        }, {
            duration: 0.2,
            ease: "ease-in"
        });

        animate(modalElement.querySelector('.modal-backdrop'), {
            opacity: 0
        }, {
            duration: 0.3,
            ease: "ease-in"
        }).finished.then(() => {
            modalElement.remove();
        });
    }
}

// Animações de scroll modernas
function initializeScrollAnimations() {
    const { animate, scroll, spring } = Motion;

    // Observador de scroll para elementos
    const observeElements = [
        '.benefit-card',
        '.tech-item',
        '.timeline-card'
    ];

    observeElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            scroll(
                animate(element, {
                    opacity: [0, 1],
                    y: [30, 0],
                    scale: [0.95, 1]
                }, {
                    ease: spring({ stiffness: 300, damping: 25 })
                }),
                {
                    target: element,
                    offset: ["start 90%", "start 60%"]
                }
            );
        });
    });

    // Parallax suave no header
    scroll(
        animate('.header::before', {
            y: [0, -50],
            opacity: [1, 0.8]
        }),
        {
            target: document.querySelector('.header'),
            offset: ["start start", "end start"]
        }
    );
}

// Micro-interações modernas
function initializeMicroInteractions() {
    const { animate, spring } = Motion;

    // Hover nos benefit cards
    document.querySelectorAll('.benefit-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            animate(card, {
                y: -12,
                scale: 1.05,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }, {
                duration: 0.3,
                ease: spring({ stiffness: 400, damping: 30 })
            });
        });

        card.addEventListener('mouseleave', () => {
            animate(card, {
                y: 0,
                scale: 1,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }, {
                duration: 0.3,
                ease: spring({ stiffness: 400, damping: 30 })
            });
        });
    });

    // Animação nos benefit icons
    document.querySelectorAll('.benefit-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            animate(icon, {
                scale: 1.2,
                rotate: 5
            }, {
                duration: 0.2,
                ease: "ease-out"
            });
        });

        icon.addEventListener('mouseleave', () => {
            animate(icon, {
                scale: 1,
                rotate: 0
            }, {
                duration: 0.2,
                ease: "ease-out"
            });
        });
    });

    // Ripple effect moderno
    document.querySelectorAll('.timeline-card, .benefit-card').forEach(element => {
        element.addEventListener('click', (e) => {
            createModernRipple(element, e);
        });
    });
}

// Ripple effect moderno
function createModernRipple(element, event) {
    const { animate } = Motion;

    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('div');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
    `;

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    animate(ripple, {
        scale: [0, 2],
        opacity: [0.6, 0]
    }, {
        duration: 0.6,
        ease: "ease-out"
    }).finished.then(() => {
        ripple.remove();
    });
}

// Detalhes específicos do modal
function getModalDetails(stepNumber) {
    const details = {
        1: `
            <div class="detail-grid">
                <div class="detail-item">
                    <strong>📋 Total arquivos:</strong> 6 documentos obrigatórios
                </div>
                <div class="detail-item">
                    <strong>⚡ Processamento:</strong> Automático com IA
                </div>
                <div class="detail-item">
                    <strong>🔒 Segurança:</strong> Criptografia AES-256
                </div>
                <div class="detail-item">
                    <strong>📱 Formatos:</strong> PDF, JPG, PNG, WEBP
                </div>
                <div class="detail-item">
                    <strong>⏱️ Tempo médio:</strong> 3-7 minutos
                </div>
            </div>
        `,
        2: `
            <div class="detail-grid">
                <div class="detail-item">
                    <strong>🔐 Certificado:</strong> ICP-Brasil homologado
                </div>
                <div class="detail-item">
                    <strong>⏰ Validade:</strong> 12 meses automática
                </div>
                <div class="detail-item">
                    <strong>☁️ Backup:</strong> Multi-cloud redundante
                </div>
                <div class="detail-item">
                    <strong>⚖️ Compliance:</strong> LGPD e ANVISA
                </div>
            </div>
        `,
        3: `
            <div class="detail-grid">
                <div class="detail-item">
                    <strong>📊 Dashboard:</strong> Tempo real responsivo
                </div>
                <div class="detail-item">
                    <strong>📈 Analytics:</strong> Métricas avançadas
                </div>
                <div class="detail-item">
                    <strong>🔔 Alertas:</strong> WhatsApp + Email + SMS
                </div>
                <div class="detail-item">
                    <strong>🔄 Sync:</strong> Instantâneo multi-device
                </div>
            </div>
        `,
        4: `
            <div class="detail-grid">
                <div class="detail-item">
                    <strong>🏛️ Portal:</strong> Gov.BR integração nativa
                </div>
                <div class="detail-item">
                    <strong>🆔 Protocolo:</strong> Auto-gerado rastreável
                </div>
                <div class="detail-item">
                    <strong>⏳ SLA:</strong> 48-72h úteis garantido
                </div>
                <div class="detail-item">
                    <strong>📡 Monitor:</strong> Status real-time API
                </div>
            </div>
        `,
        5: `
            <div class="detail-grid">
                <div class="detail-item">
                    <strong>🚚 Logística:</strong> Multi-transportadoras
                </div>
                <div class="detail-item">
                    <strong>📍 Tracking:</strong> GPS tempo real
                </div>
                <div class="detail-item">
                    <strong>🛡️ Seguro:</strong> Cobertura 100% valor
                </div>
                <div class="detail-item">
                    <strong>🚀 Express:</strong> 24-48h entrega
                </div>
            </div>
        `,
        6: `
            <div class="detail-grid">
                <div class="detail-item">
                    <strong>🔑 SSO:</strong> Login único gov.br
                </div>
                <div class="detail-item">
                    <strong>👥 RBAC:</strong> Controle granular acesso
                </div>
                <div class="detail-item">
                    <strong>📊 BI:</strong> Relatórios executivos
                </div>
                <div class="detail-item">
                    <strong>🎧 Suporte:</strong> 24/7 chat + phone
                </div>
            </div>
        `
    };

    return details[stepNumber] || '<p>Detalhes em desenvolvimento...</p>';
}

// Estilos modernos do modal
function addModernModalStyles() {
    if (document.querySelector('#modern-modal-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'modern-modal-styles';
    styles.textContent = `
        .modern-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }

        .modal-backdrop {
            position: absolute;
            inset: 0;
            background: rgba(15, 23, 42, 0.75);
            backdrop-filter: blur(12px);
        }

        .modal-container {
            position: relative;
            width: 100%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
        }

        .modal-content {
            background: white;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .modal-header {
            padding: 2rem;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .modal-icon {
            font-size: 2.5rem;
            background: linear-gradient(135deg, #3b82f6, #10b981);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .modal-header h3 {
            flex: 1;
            margin: 0;
            font-size: 1.5rem;
            font-weight: 700;
            color: #1e293b;
            letter-spacing: -0.025em;
        }

        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #64748b;
            padding: 0.5rem;
            border-radius: 12px;
            transition: all 0.2s ease;
            line-height: 1;
        }

        .modal-close:hover {
            background-color: #f1f5f9;
            color: #334155;
            transform: scale(1.05);
        }

        .modal-body {
            padding: 2rem;
        }

        .modal-details {
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid #e2e8f0;
        }

        .modal-details h4 {
            margin-bottom: 1.5rem;
            color: #10b981;
            font-size: 1.25rem;
            font-weight: 600;
        }

        .detail-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
        }

        .detail-item {
            padding: 1rem;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            font-size: 0.875rem;
            line-height: 1.5;
        }

        .detail-item strong {
            color: #334155;
            display: block;
            margin-bottom: 0.25rem;
        }

        @media (max-width: 768px) {
            .modal-header {
                padding: 1.5rem;
            }

            .modal-body {
                padding: 1.5rem;
            }

            .detail-grid {
                grid-template-columns: 1fr;
            }

            .modal-header h3 {
                font-size: 1.25rem;
            }
        }
    `;

    document.head.appendChild(styles);
}

// Fallback para quando Motion não está disponível
function initializeFallbackAnimations() {
    console.log('💫 Iniciando animações fallback CSS');

    // Adicionar classe para animações CSS
    document.body.classList.add('css-animations');

    // Observador de intersecção básico
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observar elementos para animação
    document.querySelectorAll('.timeline-card, .benefit-card, .benefit-item').forEach(el => {
        observer.observe(el);
    });
}

// Debug info
console.log('🎨 Interface CODIVAR carregada');
console.log('📦 Motion.dev:', typeof Motion !== 'undefined' ? '✅ Carregado' : '❌ Fallback CSS');
console.log('🎯 Funcionalidades: Timeline, Scroll, Micro-interações, Modais');