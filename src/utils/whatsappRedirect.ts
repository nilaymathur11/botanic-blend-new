export function redirectToWhatsApp(productName: string) {
    const phoneNumber = "1234567890";
    const message = encodeURIComponent(`Hello, I'm interested in purchasing ${productName}. Can you provide more information?`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}