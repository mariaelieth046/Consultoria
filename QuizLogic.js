import { ListaPerfumes } from './ListaPerfumes.js';
import { QuizQuestions } from './QuizQuestions.js';
import { LinkGen } from './LinkGen.js';

const quiz = {
    gender: null,
    profile: null,
    step: 0,
    
    elements: {
        intro: document.getElementById('intro-section'),
        quiz: document.getElementById('quiz-section'),
        loading: document.getElementById('loading-section'),
        result: document.getElementById('result-section'),
        progress: document.getElementById('progress-container'),
        bar: document.getElementById('progress-bar'),
        loadText: document.getElementById('loading-text'),
        loadSub: document.getElementById('loading-sub'),
        btnStart: document.getElementById('btn-start'),
        btnRestart: document.getElementById('btn-restart')
    },

    init: function() {
        this.elements.btnStart.onclick = () => this.start();
        this.elements.btnRestart.onclick = () => location.reload();
    },

    start: function() { 
        this.elements.intro.style.display = 'none'; 
        this.elements.progress.style.display = 'block';
        this.elements.quiz.style.display = 'flex'; 
        this.askGender(); 
    },

    askGender: function() {
        document.getElementById('q-text').innerText = "Como você se identifica?";
        document.getElementById('q-options').innerHTML = `
            <div class="option-card" data-gender="female">Feminino <span>→</span></div>
            <div class="option-card" data-gender="male">Masculino <span>→</span></div>
        `;
        
        const options = document.querySelectorAll('#q-options .option-card');
        options.forEach(opt => {
            opt.onclick = () => {
                this.gender = opt.getAttribute('data-gender');
                this.nextQuestion();
            };
        });
    },

    nextQuestion: function() {
        if (this.step < QuizQuestions.length) {
            const q = QuizQuestions[this.step];
            document.getElementById('q-number').innerText = `Pergunta ${this.step + 1} de ${QuizQuestions.length}`;
            document.getElementById('q-text').innerText = q.text;
            document.getElementById('q-options').innerHTML = "";
            
            q.options.forEach((opt, idx) => {
                const div = document.createElement('div');
                div.className = "option-card";
                div.innerHTML = `${opt} <span>→</span>`;
                div.onclick = () => this.handleAnswer(idx);
                document.getElementById('q-options').appendChild(div);
            });
            
            this.step++;
            this.elements.bar.style.width = (this.step * 10) + "%";
        } else { 
            this.preShowResult(); 
        }
    },

    handleAnswer: function(idx) {
        if (this.step === QuizQuestions.length) {
            const profiles = (this.gender === 'female') ? ['fresh', 'floral', 'intense', 'sweet'] : ['fresh', 'wood', 'intense', 'spiced'];
            this.profile = profiles[idx] || profiles[0];
        }
        this.nextQuestion();
    },

    preShowResult: function() {
        this.elements.quiz.style.display = 'none';
        this.elements.progress.style.display = 'none';
        this.elements.loading.style.display = 'flex';
        
        const steps = [
            {t: "Analisando...", s: "Estilo de vida"}, 
            {t: "Buscando...", s: "Melhor fragrância"}, 
            {t: "Pronto!", s: "Curadoria finalizada"}
        ];
        let i = 0;
        
        const interval = setInterval(() => {
            this.elements.loadText.innerText = steps[i].t;
            this.elements.loadSub.innerText = steps[i].s;
            i++;
            if (i >= steps.length) { 
                clearInterval(interval); 
                this.showResult(); 
            }
        }, 1000);
    },

    showResult: function() {
        this.elements.loading.style.display = 'none';
        this.elements.result.style.display = 'block';
        
        // Sorteia um perfume aleatório dentro da lista do perfil escolhido
        const listaPerfil = ListaPerfumes[this.gender][this.profile];
        const res = listaPerfil[Math.floor(Math.random() * listaPerfil.length)];

        // Monta o caminho da imagem dinamicamente usando a pasta assets
        const imagePath = `assets/${res.name}.png`;
        document.getElementById('res-img').src = imagePath;
        
        document.getElementById('res-brand').innerText = res.brand;
        document.getElementById('res-name').innerText = res.name;
        document.getElementById('res-desc').innerText = res.desc;
        
        // Utilizando o módulo LinkGen para preencher os links
        document.getElementById('btn-buy-online').href = LinkGen.getStoreLink(res.name);
        document.getElementById('share-btn').href = LinkGen.getShareResultLink();
        document.getElementById('whatsapp-btn').href = LinkGen.getConsultantLink(res.name);
    }
};

// Inicializa o quiz quando o DOM carregar
document.addEventListener('DOMContentLoaded', () => quiz.init());
