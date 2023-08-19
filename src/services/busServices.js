const mockBuses = [
    { id: 1, name: 'Bus A', route: 'Route 1' },
    { id: 2, name: 'Bus B', route: 'Route 2' },
    // Add more mock data
  ];
  
  export function getBuses() {
    return Promise.resolve(mockBuses);
  }
  