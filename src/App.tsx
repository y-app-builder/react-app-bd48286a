import React, { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
}

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('New York');
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, this would be an API call to a weather service
        // Simulating API response with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data based on location
        const mockData: Record<string, WeatherData> = {
          'New York': {
            temperature: 72,
            condition: 'Partly Cloudy',
            humidity: 65,
            windSpeed: 8,
            location: 'New York, NY'
          },
          'London': {
            temperature: 62,
            condition: 'Rainy',
            humidity: 80,
            windSpeed: 12,
            location: 'London, UK'
          },
          'Tokyo': {
            temperature: 78,
            condition: 'Sunny',
            humidity: 50,
            windSpeed: 5,
            location: 'Tokyo, Japan'
          },
          'Sydney': {
            temperature: 85,
            condition: 'Clear',
            humidity: 45,
            windSpeed: 10,
            location: 'Sydney, Australia'
          }
        };
        
        const data = mockData[location] || {
          temperature: 70,
          condition: 'Unknown',
          humidity: 60,
          windSpeed: 7,
          location: `${location}`
        };
        
        setWeatherData(data);
      } catch (err) {
        setError('Failed to fetch weather data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setLocation(searchInput);
      setSearchInput('');
    }
  };

  const getWeatherIcon = (condition: string): string => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return '☀️';
      case 'clear':
        return '🌞';
      case 'partly cloudy':
        return '⛅';
      case 'cloudy':
        return '☁️';
      case 'rainy':
        return '🌧️';
      case 'stormy':
        return '⛈️';
      case 'snowy':
        return '❄️';
      default:
        return '🌡️';
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.weatherCard}>
        <h1 style={styles.title}>Weather Forecast</h1>
        
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter city name"
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchButton}>Search</button>
        </form>
        
        {loading && <p style={styles.message}>Loading weather data...</p>}
        
        {error && <p style={styles.errorMessage}>{error}</p>}
        
        {!loading && !error && weatherData && (
          <div style={styles.weatherInfo}>
            <h2 style={styles.location}>{weatherData.location}</h2>
            <div style={styles.mainWeather}>
              <span style={styles.weatherIcon}>
                {getWeatherIcon(weatherData.condition)}
              </span>
              <span style={styles.temperature}>{weatherData.temperature}°F</span>
            </div>
            <p style={styles.condition}>{weatherData.condition}</p>
            <div style={styles.details}>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Humidity</span>
                <span style={styles.detailValue}>{weatherData.humidity}%</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Wind</span>
                <span style={styles.detailValue}>{weatherData.windSpeed} mph</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
    fontFamily: 'Arial, sans-serif',
    padding: '20px'
  },
  weatherCard: {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    padding: '30px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center' as const
  },
  title: {
    color: '#333',
    marginBottom: '20px',
    fontSize: '28px'
  },
  searchForm: {
    display: 'flex',
    marginBottom: '25px'
  },
  searchInput: {
    flex: 1,
    padding: '10px 15px',
    borderRadius: '30px 0 0 30px',
    border: '1px solid #ddd',
    fontSize: '16px',
    outline: 'none'
  },
  searchButton: {
    padding: '10px 20px',
    background: '#6e8efb',
    color: 'white',
    border: 'none',
    borderRadius: '0 30px 30px 0',
    cursor: 'pointer',
    fontSize: '16px'
  },
  message: {
    color: '#666',
    fontSize: '18px'
  },
  errorMessage: {
    color: '#e74c3c',
    fontSize: '16px'
  },
  weatherInfo: {
    marginTop: '10px'
  },
  location: {
    color: '#333',
    fontSize: '22px',
    marginBottom: '15px'
  },
  mainWeather: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px'
  },
  weatherIcon: {
    fontSize: '50px',
    marginRight: '15px'
  },
  temperature: {
    fontSize: '48px',
    fontWeight: 'bold' as const,
    color: '#333'
  },
  condition: {
    fontSize: '20px',
    color: '#555',
    marginBottom: '20px'
  },
  details: {
    display: 'flex',
    justifyContent: 'space-around',
    borderTop: '1px solid #eee',
    paddingTop: '20px'
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column' as const
  },
  detailLabel: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '5px'
  },