import { useEffect, useState } from 'react';

export interface MenuItem {
  foodItem: string;
  price: number;
  ingredients: string;
  availability: string;
}

export const useGoogleSheetData = (csvUrl: string) => {
  const [data, setData] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(csvUrl);
        const text = await response.text();
        
        const lines = text.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim());
        
        const parsedData: MenuItem[] = [];
        
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim());
          if (values.length >= 4) {
            parsedData.push({
              foodItem: values[0],
              price: parseInt(values[1]) || 0,
              ingredients: values[2],
              availability: values[3]
            });
          }
        }
        
        setData(parsedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, [csvUrl]);

  return { data, loading, error };
};
