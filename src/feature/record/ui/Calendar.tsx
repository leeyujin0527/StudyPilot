import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Props {
  selectedDate: Date;
  onChange: (date: Date) => void;
}

const CustomCalendar = ({ selectedDate, onChange }: Props) => {
  return (
    <Calendar
      value={selectedDate}
      onChange={(date) => onChange(date as Date)}
    />
  );
};

export default CustomCalendar;
