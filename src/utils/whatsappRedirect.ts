export const redirectToWhatsApp = (message: string) => {
    const phoneNumber = '7014172155';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
};