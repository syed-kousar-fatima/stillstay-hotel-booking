export const BOOKING_STORAGE_KEY = 'stillstay_bookings';

export function getNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 1;
  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  const days = Math.ceil((end - start) / 86400000);
  return Math.max(days, 1);
}

export function calculatePrice(nightlyRate, nights) {
  const subtotal = nightlyRate * nights;
  const taxes = Math.round(subtotal * 0.12);
  const serviceFee = 200;
  return { subtotal, taxes, serviceFee, total: subtotal + taxes + serviceFee };
}

export function formatCurrency(amount, country = 'India') {
  const currency = country === 'India' ? 'INR' : 'INR';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getDateOffset(offset) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
}

export function getCheckoutDate(checkIn, nights) {
  if (!checkIn || !nights) return '';
  const date = new Date(`${checkIn}T00:00:00`);
  date.setDate(date.getDate() + Number(nights));
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function getDefaultDates() {
  return { checkIn: getDateOffset(7), checkOut: getDateOffset(10) };
}

export function validateBookingForm(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter the name for this reservation.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email address.';
  if (!/^[+()\d\s-]{7,20}$/.test(values.phone)) errors.phone = 'Enter a valid phone number.';
  return errors;
}
