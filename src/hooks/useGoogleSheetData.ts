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
        
        const parsedData: MenuItem[] = [];
        
        // Parse CSV properly handling quoted fields
        const parseCSVLine = (line: string): string[] => {
          const result: string[] = [];
          let current = '';
          let inQuotes = false;
          
          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              result.push(current.trim());
              current = '';
            } else {
              current += char;
            }
          }
          result.push(current.trim());
          return result;
        };
        
        for (let i = 1; i < lines.length; i++) {
          const values = parseCSVLine(lines[i]);
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
