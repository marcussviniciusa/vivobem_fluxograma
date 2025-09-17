// Sistema de Importação Cannabis Medicinal - CODIVAR
// JavaScript para interatividade e animações

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeTimelineInteractions();
    initializeCTAButtons();
    initializeScrollEffects();
});

// Inicialização das animações
function initializeAnimations() {
    // Animação de entrada do header
    const header = document.querySelector('.header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-50px)';

        setTimeout(() => {
            header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 100);
    }

    // Animação dos cards de benefícios na introdução
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';

        setTimeout(() => {
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 200 + (index * 100));
    });
}

// Interações da timeline
function initializeTimelineInteractions() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
        const card = item.querySelector('.timeline-card');

        if (card) {
            // Efeito de hover aprimorado
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = '0 25px 50px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';

                // Destacar o marcador correspondente
                const marker = item.querySelector('.timeline-marker');
                if (marker) {
                    marker.style.transform = 'scale(1.1)';
                    marker.style.borderWidth = '6px';
                }
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';

                // Restaurar o marcador
                const marker = item.querySelector('.timeline-marker');
                if (marker) {
                    marker.style.transform = 'scale(1)';
                    marker.style.borderWidth = '4px';
                }
            });

            // Clique para expandir detalhes
            card.addEventListener('click', function() {
                expandTimelineCard(item, index + 1);
            });
        }
    });
}

// Função para expandir card da timeline
function expandTimelineCard(item, stepNumber) {
    const existingModal = document.querySelector('.timeline-modal');
    if (existingModal) {
        existingModal.remove();
    }

    const cardTitle = item.querySelector('.card-header h3').textContent;
    const cardIcon = item.querySelector('.card-icon').textContent;
    const cardBody = item.querySelector('.card-body').innerHTML;

    const modal = document.createElement('div');
    modal.className = 'timeline-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <span class="modal-icon">${cardIcon}</span>
                <h3>Etapa ${stepNumber}: ${cardTitle}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${cardBody}
                <div class="modal-details">
                    <h4>Detalhes Técnicos:</h4>
                    ${getTimelineDetails(stepNumber)}
                </div>
            </div>
        </div>
    `;

    // Adicionar estilos do modal
    addModalStyles();

    document.body.appendChild(modal);

    // Animação de entrada
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    // Event listeners para fechar
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

// Detalhes específicos para cada etapa
function getTimelineDetails(stepNumber) {
    const details = {
        1: `
            <ul>
                <li><strong>Total de arquivos:</strong> 6 documentos obrigatórios</li>
                <li><strong>Formatos aceitos:</strong> PDF, JPG, PNG</li>
                <li><strong>Tamanho máximo:</strong> 5MB por arquivo</li>
                <li><strong>Validação:</strong> Automática com OCR</li>
                <li><strong>Tempo médio:</strong> 3-7 minutos</li>
            </ul>
        `,
        2: `
            <ul>
                <li><strong>Assinatura:</strong> Certificado digital ICP-Brasil</li>
                <li><strong>Validade:</strong> 12 meses</li>
                <li><strong>Backup:</strong> Armazenamento seguro na nuvem</li>
                <li><strong>Conformidade:</strong> LGPD e regulações ANVISA</li>
            </ul>
        `,
        3: `
            <ul>
                <li><strong>Interface:</strong> Dashboard responsivo</li>
                <li><strong>Relatórios:</strong> Exportação em Excel/PDF</li>
                <li><strong>Notificações:</strong> Email e SMS automáticos</li>
                <li><strong>Backup:</strong> Sincronização em tempo real</li>
            </ul>
        `,
        4: `
            <ul>
                <li><strong>Portal:</strong> Gov.BR integrado</li>
                <li><strong>Protocolo:</strong> Geração automática</li>
                <li><strong>SLA:</strong> 48-72h úteis (ANVISA)</li>
                <li><strong>Monitoramento:</strong> Status em tempo real</li>
            </ul>
        `,
        5: `
            <ul>
                <li><strong>Transportadoras:</strong> Correios, TNT, FedEx</li>
                <li><strong>Rastreamento:</strong> Código único por pedido</li>
                <li><strong>Seguro:</strong> Cobertura total do produto</li>
                <li><strong>Prazo:</strong> 3-7 dias úteis</li>
            </ul>
        `,
        6: `
            <ul>
                <li><strong>Acesso:</strong> Login GOV.BR ou certificado</li>
                <li><strong>Perfis:</strong> Secretário, Técnico, Consulta</li>
                <li><strong>Relatórios:</strong> Mensais e anuais</li>
                <li><strong>Suporte:</strong> Chat online e telefone</li>
            </ul>
        `
    };

    return details[stepNumber] || '<p>Detalhes técnicos em desenvolvimento.</p>';
}

// Adicionar estilos do modal dinamicamente
function addModalStyles() {
    if (document.querySelector('#modal-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'modal-styles';
    styles.textContent = `
        .timeline-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        .timeline-modal.active {
            opacity: 1;
            visibility: visible;
        }

        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
        }

        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.9);
            background: white;
            border-radius: 12px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            transition: transform 0.3s ease;
        }

        .timeline-modal.active .modal-content {
            transform: translate(-50%, -50%) scale(1);
        }

        .modal-header {
            padding: 1.5rem;
            border-bottom: 1px solid #e9ecef;
            display: flex;
            align-items: center;
            gap: 1rem;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-radius: 12px 12px 0 0;
        }

        .modal-icon {
            font-size: 2rem;
        }

        .modal-header h3 {
            flex: 1;
            margin: 0;
            font-size: 1.25rem;
            font-weight: 600;
            color: #4A90E2;
        }

        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6c757d;
            padding: 0.25rem;
            border-radius: 4px;
            transition: background-color 0.2s ease;
        }

        .modal-close:hover {
            background-color: #f8f9fa;
        }

        .modal-body {
            padding: 1.5rem;
        }

        .modal-details {
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid #e9ecef;
        }

        .modal-details h4 {
            margin-bottom: 1rem;
            color: #7AC142;
            font-size: 1.125rem;
            font-weight: 600;
        }

        .modal-details ul {
            list-style: none;
            padding: 0;
        }

        .modal-details li {
            padding: 0.5rem 0;
            border-bottom: 1px solid #f8f9fa;
            color: #495057;
        }

        .modal-details li:last-child {
            border-bottom: none;
        }

        .modal-details strong {
            color: #343a40;
        }

        @media (max-width: 768px) {
            .modal-content {
                width: 95%;
                max-height: 90vh;
            }

            .modal-header {
                padding: 1rem;
            }

            .modal-body {
                padding: 1rem;
            }
        }
    `;

    document.head.appendChild(styles);
}

// Inicialização dos botões CTA
function initializeCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const buttonText = this.textContent.trim();

            // Efeito de ripple
            createRippleEffect(this, e);

            // Ações específicas baseadas no texto do botão
            setTimeout(() => {
                switch(buttonText) {
                    case 'Saiba mais sobre o fluxo':
                        scrollToTimeline();
                        break;
                    case 'Contate nossa equipe':
                        showContactModal();
                        break;
                    case 'Documentação técnica':
                        showTechModal();
                        break;
                }
            }, 200);
        });
    });
}

// Efeito ripple nos botões
function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;

    // Adicionar animação CSS se não existir
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// Scroll suave para a timeline
function scrollToTimeline() {
    const timeline = document.querySelector('.timeline-section');
    if (timeline) {
        timeline.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Destacar a timeline brevemente
        timeline.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%)';
        setTimeout(() => {
            timeline.style.background = '#f8f9fa';
        }, 2000);
    }
}

// Modal de contato
function showContactModal() {
    const modal = document.createElement('div');
    modal.className = 'contact-modal timeline-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <span class="modal-icon">📞</span>
                <h3>Contate Nossa Equipe</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p><strong>CODIVAR - Consórcio de Desenvolvimento Intermunicipal</strong></p>
                <br>
                <p><strong>📧 Email:</strong> contato@codivar.org.br</p>
                <p><strong>📱 WhatsApp:</strong> (13) 99999-9999</p>
                <p><strong>📞 Telefone:</strong> (13) 3333-4444</p>
                <p><strong>🏢 Endereço:</strong> Vale do Ribeira e Litoral Sul - SP</p>
                <br>
                <p><strong>⏰ Horário de Atendimento:</strong></p>
                <p>Segunda a Sexta: 8h às 17h</p>
                <p>Sábado: 8h às 12h</p>
                <br>
                <p><em>Para dúvidas sobre o sistema de importação de cannabis medicinal, nossa equipe técnica está pronta para ajudar os 28 municípios parceiros.</em></p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);

    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
}

// Modal de documentação técnica
function showTechModal() {
    const modal = document.createElement('div');
    modal.className = 'tech-modal timeline-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <span class="modal-icon">📚</span>
                <h3>Documentação Técnica</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <h4>🔧 Stack Tecnológico</h4>
                <ul>
                    <li><strong>Frontend:</strong> Next.js 14, React 18, TypeScript</li>
                    <li><strong>Backend:</strong> Node.js, Express, MongoDB</li>
                    <li><strong>Autenticação:</strong> NextAuth.js, Gov.BR Connect</li>
                    <li><strong>Cloud:</strong> AWS (EC2, S3, RDS)</li>
                </ul>

                <h4>🔗 Integrações</h4>
                <ul>
                    <li><strong>ANVISA:</strong> API Portal Canábinos</li>
                    <li><strong>Gov.BR:</strong> Login Único Cidadão</li>
                    <li><strong>Correios:</strong> API SIGEP Web</li>
                    <li><strong>Assinatura Digital:</strong> ICP-Brasil</li>
                </ul>

                <h4>🛡️ Segurança</h4>
                <ul>
                    <li><strong>Criptografia:</strong> AES-256, TLS 1.3</li>
                    <li><strong>LGPD:</strong> Compliance total</li>
                    <li><strong>Backup:</strong> 3-2-1 strategy</li>
                    <li><strong>Monitoramento:</strong> 24/7 SOC</li>
                </ul>

                <h4>📊 Performance</h4>
                <ul>
                    <li><strong>Uptime:</strong> 99.9% SLA</li>
                    <li><strong>Resposta:</strong> < 300ms média</li>
                    <li><strong>Escalabilidade:</strong> Auto-scaling</li>
                    <li><strong>CDN:</strong> CloudFlare</li>
                </ul>

                <p><em>Sistema desenvolvido especificamente para atender as necessidades dos 28 municípios do CODIVAR, garantindo conformidade regulatória e eficiência operacional.</em></p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);

    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
}

// Efeitos de scroll
function initializeScrollEffects() {
    // Intersection Observer para animações no scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('benefit-card')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                    entry.target.classList.add('animate-in');
                }

                if (entry.target.classList.contains('tech-item')) {
                    entry.target.classList.add('animate-in');
                }
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    document.querySelectorAll('.benefit-card, .tech-item').forEach(el => {
        observer.observe(el);
    });

    // Adicionar estilos de animação
    if (!document.querySelector('#scroll-animations')) {
        const style = document.createElement('style');
        style.id = 'scroll-animations';
        style.textContent = `
            .benefit-card, .tech-item {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }

            .benefit-card.animate-in, .tech-item.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
}

// Utilitários
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Melhorias de acessibilidade
document.addEventListener('keydown', function(e) {
    // Fechar modals com ESC
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.timeline-modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            setTimeout(() => activeModal.remove(), 300);
        }
    }
});

// Log de inicialização
console.log('🏥 Sistema CODIVAR - Cannabis Medicinal inicializado');
console.log('🌟 Funcionalidades carregadas: Timeline interativa, Modais, Animações');
console.log('📱 Responsividade: Mobile, Tablet, Desktop');
console.log('🔧 Versão: 1.0.0 - Apresentação Técnica');