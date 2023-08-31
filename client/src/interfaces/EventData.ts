interface EventData {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location?: Location;
}

export default EventData;
