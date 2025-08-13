 document.addEventListener("DOMContentLoaded", () => {
        

            const sidebar = document.getElementById("sidebar");
            const menuToggleBtn = document.getElementById("menu-toggle-btn");
            const sidebarCloseBtn = document.getElementById("sidebar-close-btn");
            const mainContent = document.querySelector("main");
            const toggleButtons = document.querySelectorAll(".toggle-switch-btn");
            const gridContainer = document.querySelector(".apostilas-grid");
            const loadingModal = document.getElementById("loading-modal");
            const donationModal = document.getElementById("donation-modal");
            const creditsModal = document.getElementById("credits-modal");
        
            document.querySelectorAll(".modal-close-btn").forEach(btn => {
                btn.addEventListener("click", closeModal);
            });
        

            document.getElementById("donation-link").addEventListener("click", (e) => { e.preventDefault(); openModal(donationModal); });
            document.getElementById("credits-link").addEventListener("click", (e) => { e.preventDefault(); openModal(creditsModal); });
        

            creditsModal.querySelector(".modal-action-btn.secondary").addEventListener("click", closeModal);
        

            const apostilasData = [

                { ano: "6º Ano", nivel: "fundamental", materias: [
                    { title: "Ciências, História, Geografia", url: "https://acervocmsp.educacao.sp.gov.br/138026/1262512.pdf" },
                    { title: "Matemática, Português", url: "https://acervocmsp.educacao.sp.gov.br/137970/1261821.pdf" }
                ]},
                { ano: "7º Ano", nivel: "fundamental", materias: [
                    { title: "Ciências, História, Geografia", url: "https://acervocmsp.educacao.sp.gov.br/138028/1262518.pdf" },
                    { title: "Matemática, Português", url: "https://acervocmsp.educacao.sp.gov.br/137972/1261834.pdf" }
                ]},
                { ano: "8º Ano", nivel: "fundamental", materias: [
                    { title: "Ciências, História, Geografia", url: "https://acervocmsp.educacao.sp.gov.br/138030/1262528.pdf" },
                    { title: "Matemática, Português", url: "https://acervocmsp.educacao.sp.gov.br/137974/1261839.pdf" }
                ]},
                { ano: "9º Ano", nivel: "fundamental", materias: [
                    { title: "Ciências, História, Geografia", url: "https://acervocmsp.educacao.sp.gov.br/138032/1262543.pdf" },
                    { title: "Matemática, Português", url: "https://acervocmsp.educacao.sp.gov.br/137976/1261848.pdf" }
                ]},

                { ano: "1º Ano", nivel: "medio", materias: [
                    { title: "Geografia, História", url: "https://acervocmsp.educacao.sp.gov.br/138036/1262569.pdf" },
                    { title: "Matemática, Português", url: "https://acervocmsp.educacao.sp.gov.br/138011/1262482.pdf" },
                    { title: "Física, Biologia, Química", url: "https://acervocmsp.educacao.sp.gov.br/138034/1262556.pdf" }
                ]},
                { ano: "2º Ano", nivel: "medio", materias: [
                    { title: "Geografia, História", url: "https://acervocmsp.educacao.sp.gov.br/138038/1262582.pdf" },
                    { title: "Matemática, Português", url: "https://acervocmsp.educacao.sp.gov.br/138013/1262487.pdf" },
                    { title: "Física, Biologia, Química", url: "https://acervocmsp.educacao.sp.gov.br/138040/1262595.pdf" }
                ]},
                { ano: "3º Ano", nivel: "medio", materias: [
                    { title: "História, Física", url: "https://acervocmsp.educacao.sp.gov.br/138042/1262617.pdf" },
                    { title: "Matemática, Português", url: "https://acervocmsp.educacao.sp.gov.br/138016/1262492.pdf" }
                ]}
            ];
        
            let currentFilter = "medio";
            let lastFocusedElement = null;
        
            function openModal(modalElement) {
                modalElement.classList.add("active");
            }
        
            function closeModal() {
                document.querySelectorAll(".modal-overlay.active").forEach(modal => {
                    modal.classList.remove("active");
                });
            }
        
            document.querySelectorAll(".modal-overlay").forEach(overlay => {
                overlay.addEventListener("click", (e) => {
                    if (e.target === overlay) closeModal();
                });
            });
        
            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape") closeModal();
            });
        
            function renderApostilas(filter) {
                gridContainer.innerHTML = "";
                const filteredApostilas = apostilasData.filter(a => a.nivel === filter);
        
                filteredApostilas.forEach((apostila, index) => {
                    const card = document.createElement("div");
                    card.className = "apostila-card";
                    card.style.animationDelay = `${index * 100}ms`; 
        
                    let buttonsHtml = '';
                    apostila.materias.forEach(materia => {
                        buttonsHtml += `
                            <button class="card-button" data-url="${materia.url}">
                                <svg class="icon" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                                <span>${materia.title}</span>
                            </button>
                        `;
                    });
        
                    card.innerHTML = `
                        <span class="card-tag online">ONLINE</span>
                        <div class="card-content">
                            <h3>${apostila.ano}</h3>
                            <div class="card-buttons-container">
                                ${buttonsHtml}
                            <h3>Vol. 3</h3>
                            </div>
                        </div>
                    `;
        
                    gridContainer.appendChild(card);
        
                    card.querySelectorAll(".card-button").forEach(button => {
                        button.addEventListener("click", function() {
                            const url = this.dataset.url;
                            openModal(loadingModal);
        
                            setTimeout(() => {
                                closeModal();
                                window.open(url, '_blank');
                            }, 1200);
                        });
                    });
                });
            }
        
            if (menuToggleBtn) {
                menuToggleBtn.addEventListener("click", () => {
                    sidebar.classList.toggle("open");
                });
            }

            if (sidebarCloseBtn) {
                sidebarCloseBtn.addEventListener("click", () => {
                    sidebar.classList.remove("open");
                });
            }
            
            toggleButtons.forEach(button => {
                button.addEventListener("click", function() {
                    toggleButtons.forEach(btn => {
                        btn.classList.remove("active");
                        btn.setAttribute('aria-pressed', 'false');
                    });
                    this.classList.add("active");
                    this.setAttribute('aria-pressed', 'true');
                    currentFilter = this.dataset.level;
                    renderApostilas(currentFilter);
                });
            });
        
            const themeToggleBtn = document.getElementById("theme-toggle-btn");
            const lightIcon = `
<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"
     fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="5"/>
  <line x1="12" y1="2"  x2="12" y2="4"/>
  <line x1="12" y1="20" x2="12" y2="22"/>
  <line x1="2"  y1="12" x2="4"  y2="12"/>
  <line x1="20" y1="12" x2="22" y2="12"/>
  <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"/>
  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
  <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
</svg>`;
            const darkIcon = `<svg class="icon" viewBox="0 0 24 24"><path d="M12 2.25c-5.38 0-9.75 4.37-9.75 9.75s4.37 9.75 9.75 9.75 9.75-4.37 9.75-9.75S17.38 2.25 12 2.25zm0 17.25V4.5c4.14 0 7.5 3.36 7.5 7.5s-3.36 7.5-7.5 7.5z"/></svg>`;

            function applyTheme(theme) {
                document.documentElement.setAttribute("data-theme", theme);
                localStorage.setItem("theme", theme);
                themeToggleBtn.innerHTML = theme === "dark" ? lightIcon : darkIcon;
            }
        
            themeToggleBtn.addEventListener("click", () => {
                const newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
                applyTheme(newTheme);
            });
        
            const savedTheme = localStorage.getItem("theme") || "dark";
            applyTheme(savedTheme);
        
            const canvas = document.getElementById("particles-canvas");
            const ctx = canvas.getContext("2d");
            let particles = [];
            const numParticles = 70;
        
            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        
            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 2 + 0.5;
                    this.speedX = Math.random() * 0.4 - 0.2;
                    this.speedY = Math.random() * 0.4 - 0.2;
                    this.color = getComputedStyle(document.documentElement).getPropertyValue("--particle-color").trim();
                }
                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;
                    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
                    this.color = getComputedStyle(document.documentElement).getPropertyValue("--particle-color").trim();
                }
                draw() {
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        
            function initParticles() {
                particles = [];
                for (let i = 0; i < numParticles; i++) {
                    particles.push(new Particle());
                }
            }
        
            function animateParticles() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let i = 0; i < particles.length; i++) {
                    particles[i].update();
                    particles[i].draw();
                }
                requestAnimationFrame(animateParticles);
            }
        
            window.addEventListener("resize", resizeCanvas);
            resizeCanvas();
            initParticles();
            animateParticles();
        

            renderApostilas(currentFilter);
        });
