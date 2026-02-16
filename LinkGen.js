export const LinkGen = {
    config: {
        whatsappPhone: "558198786412",
        baseStoreLink: "https://www.minhaloja.natura.com/s/produtos?consultoria=elieth&busca=",
        quizUrl: window.location.href,
        instagramUrl: "https://www.instagram.com/mariaelieth.cosmeticos/"
    },
    
    getStoreLink: function(productName) {
        return this.config.baseStoreLink + encodeURIComponent(productName);
    },
    
    getShareResultLink: function(productName) {
        // Mensagem completa com resultado, link do quiz e link do instagram
        const text = `Minha amiga, meu resultado foi o *${productName}*! ✨\n\nFaz o teste você também pra descobrir seu perfume ideal aqui:\n${this.config.quizUrl}\n\nE aproveita pra seguir a Elieth no Instagram, ela dá dicas ótimas:\n${this.config.instagramUrl}`;
        return `https://wa.me/?text=${encodeURIComponent(text)}`;
    },
    
    getConsultantLink: function(productName) {
        const text = `Oi Elieth! Terminei o teste e meu resultado foi o ${productName}. Queria saber mais sobre ele.`;
        return `https://wa.me/${this.config.whatsappPhone}?text=${encodeURIComponent(text)}`;
    }
};
