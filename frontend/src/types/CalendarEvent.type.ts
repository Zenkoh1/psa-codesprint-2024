type CalendarEventType = {
  id: number;
  title: string;
  start_time: Date;
  end_time: Date;
  user_id: number;
  workshop_id: number | null;
  created_at: Date;
  updated_at: Date;
};

export default CalendarEventType;
