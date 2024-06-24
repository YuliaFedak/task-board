export function formatDate(dateString: string): string {
    const months: string[] = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const days: string[] = [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
    ];

    const date: Date = new Date(dateString);
    const year: number = date.getFullYear();
    const month: string = months[date.getMonth()];
    const day: string = days[date.getDay()];
    const dayOfMonth: number = date.getDate();
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    const seconds: number = date.getSeconds();

    return `${day}, ${dayOfMonth} ${month}`;
}

export function formatDateAndTime(dateString: string): string {
    const months: string[] = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const days: string[] = [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
    ];

    const date: Date = new Date(dateString);
    const year: number = date.getFullYear();
    const month: string = months[date.getMonth()];
    const day: string = days[date.getDay()];
    const dayOfMonth: number = date.getDate();
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    const seconds: number = date.getSeconds();

    return `${hours}:${minutes},   ${dayOfMonth} ${month}`;
}