import { ListaPerfumes } from './ListaPerfumes.js';
import { QuizQuestions } from './QuizQuestions.js';
import { LinkGen } from './LinkGen.js';

const quiz = {
    // ... (mesma inicialização anterior)

    showResult: function() {
        this.elements.loading.style.display = 'none';
        this.elements.result.style.display = 'block';
        
        const listaPerfil = ListaPerfumes[this.gender][this.profile];
        const res = listaPerfil[Math.floor(Math.random() * listaPerfil.length)];

        // LÓGICA DA IMAGEM DINÂMICA
        // Pega o nome do perfume e aponta para a pasta assets
        const imagePath = `assets/${res.name}.png`;
        document.getElementById('res-img').src = imagePath;
        
        document.getElementById('res-brand').innerText = res.brand;
        document.getElementById('res-name').innerText = res.name;
        document.getElementById('res-desc').innerText = res.desc;
        
        document.getElementById('btn-buy-online').href = LinkGen.getStoreLink(res.name);
        document.getElementById('share-btn').href = LinkGen.getShareResultLink();
        document.getElementById('whatsapp-btn').href = LinkGen.getConsultantLink(res.name);
    }
};

document.addEventListener('DOMContentLoaded', () => quiz.init());
