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
        const text = `Fiz a Consultoria Olfativa Premium da Elieth e descobri que minha assinatura perfeita é o *${productName}*! \n\nFaça o teste rápido e descubra o seu também:\n${this.config.quizUrl}\n\nAproveite e siga a Elieth no Instagram para mais dicas:\n${this.config.instagramUrl}`;
        return `https://wa.me/?text=${encodeURIComponent(text)}`;
    },
    
    getConsultantLink: function(productName) {
        const text = `Oi Elieth! Terminei o teste e meu resultado foi o ${productName}. Queria saber mais sobre ele.`;
        return `https://wa.me/${this.config.whatsappPhone}?text=${encodeURIComponent(text)}`;
    }
};
