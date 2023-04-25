import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { CalendarEvent } from 'react-bootstrap-icons';

/**
 * ## AddToCalendarDropdown component
 *
 * Renders a dropdown with buttons that link to add an event to a calendar.
 *
 * Supported calendars: Google Calendar, Microsoft Outlook Calendar
 *
 * ### Props
 *
 * - `eventName` (required):
 * A string of the event's name.
 *
 * - `description` (required):
 * A string of the event's description.
 *
 * - `location` (required):
 * A string of the event's location.
 *
 * - `startDateTime` (required):
 * The Date that the event starts (works best if time is included).
 *
 * - `endDateTime` (required):
 * The Date that the event ends (works best if time is included).
 *
 * ---
 *
 * @type { React.FC<{ eventName: string, description: string, location: string, startDateTime: Date, endDateTime: Date }> }
 */
const AddToCalendarDropdown = ({ eventName, description, location, startDateTime, endDateTime }) => (
  <Dropdown className="btn-add-to-cal">
    <Dropdown.Toggle className="icon-button">
      <CalendarEvent /> Add to Calendar
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item
        target="_blank"
        href={'https://www.google.com/calendar/render?action=TEMPLATE&' +
        `text=${eventName}&` +
        `details=${description}&` +
        `location=${location}&` +
        `dates=${startDateTime.toISOString().replaceAll(/[-,:]/g, '').split('.')[0]}Z` +
        `%2F${endDateTime.toISOString().replaceAll(/[-,:]/g, '').split('.')[0]}Z`}
      >
        <img width={18} src="/assets/google-calendar-icon.svg" alt="Google Calendar Icon" /> Google Calendar
      </Dropdown.Item>
      <Dropdown.Item
        target="_blank"
        href={'https://outlook.live.com/calendar/0/deeplink/compose?allday=false&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&' +
        `subject=${eventName}&` +
        `body=${description}&` +
        `location=${location}&` +
        `startdt=${startDateTime.toISOString()}&` +
        `enddt=${endDateTime.toISOString()}&`}
      >
        <img width={18} src="/assets/microsoft-office-outlook-icon.svg" alt="Microsoft Outlook Icon" /> Microsoft Outlook
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

AddToCalendarDropdown.propTypes = {
  eventName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  startDateTime: PropTypes.instanceOf(Date).isRequired,
  endDateTime: PropTypes.instanceOf(Date).isRequired,
};

export default AddToCalendarDropdown;
