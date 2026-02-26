const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
});

export const dateMapper = {
    toFullDate: (dateStr: string): string => {
        const date = new Date(dateStr);
        return dateFormatter.format(date)
            .replace(/\s/g, '')
            .replace(/\.$/, '');
    }
}