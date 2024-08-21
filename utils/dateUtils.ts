// utils/dateUtils.ts
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) 
      ? 'Tanggal tidak valid' 
      : date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  };
  