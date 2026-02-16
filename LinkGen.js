export const LinkGen = {
    // Configurações base
    config: {
        whatsappPhone: "558198786412",
        baseStoreLink: "https://www.minhaloja.natura.com/s/produtos?consultoria=elieth&busca=",
        quizUrl: window.location.href
    },
    
    // Gera o link de compra na loja Natura
    getStoreLink: function(productName) {
        return this.config.baseStoreLink + encodeURIComponent(productName);
    },
    
    // Gera o link para compartilhar com amigos via WhatsApp
    getShareResultLink: function() {
        const text = `Amiga, veja meu perfume ideal: ${this.config.quizUrl}`;
        return `https://wa.me/?text=${encodeURIComponent(text)}`;
    },
    
    // Gera o link de contato direto com a consultora
    getConsultantLink: function(productName) {
        const text = `Oi Elieth! Meu resultado foi: ${productName}`;
        return `https://wa.me/${this.config.whatsappPhone}?text=${encodeURIComponent(text)}`;
    }
};
