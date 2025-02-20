export const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return "Invalid date format";
    }

    if (end < start) {
        return "End date must be after start date";
    }

    // Années, Mois, Jours
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    // Ajuster les jours négatifs
    if (days < 0) {
        months -= 1;
        const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
        days += previousMonth;
    }

    // Ajuster les mois négatifs
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    // Construire la chaîne de résultat
    const parts = [];
    if (years > 0) parts.push(`${years} year${years > 1 ? 's' : ''}`);
    if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`);
    if (days > 0) parts.push(`${days} day${days > 1 ? 's' : ''}`);

    return parts.length ? parts.join(' - ') : "0 day";
};
