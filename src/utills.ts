export const generateCouponCode = (name: string): string => {
    const sanitizedName = name.toLocaleLowerCase();
    const month = new Date().toLocaleString('default', { month: 'short' }).toLocaleLowerCase();
    const year = new Date().getFullYear().toString().slice(-2);
    return `${sanitizedName}_${month}${year}`;
}
