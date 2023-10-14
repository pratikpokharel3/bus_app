export type User = {
  id: string
  name: string
  email: string
  gender: string
  phone_number: string
  location_id: string
  user_role: string
  created_at: string
  updated_at: string
  location: Location
}

export type Location = {
  id: string
  province: string
  district: string
  municipality: string
  ward: string
  created_at: string
  updated_at: string
}

export type Bus = {
  id: string
  bus_name: string
  total_seats: number
  bus_plate_number: string
  driver_name: string
  conductor_name: string
  bus_owner: string
  bus_status: string
  created_at: string
  updated_at: string
}

export type BusRoute = {
  id: string
  source_location_id: string
  destination_location_id: string
  price: number
  created_at: string
  updated_at: string
}

export type BusDeparture = {
  id: string
  bus_id: string
  bus_route_id: string
  total_tickets: number
  seats_booked: string
  departure_datetime: string
  departure_status: string
  created_at: string
  updated_at: string
  bus: Bus
  bus_route: BusRoute & {
    source_location: Location
    destination_location: Location
  }
}

export type Booking = {
  id: string
  customer_id: string
  departure_id: string
  total_tickets: number
  seats_booked: string
  total_amount: number
  vat: number
  grand_total: number
  created_at: string
  updated_at: string
  customer: User
  bus_departure: BusDeparture
  bank: Bank
}

export type Payment = {
  id: string
  booking_id: string
  customer_id: string
  paid_amount: number
  created_at: string
  updated_at: string
  bank: Bank
}

export type Bank = {
  id: string
  bank_name: string
  branch_location_id: string
  created_at: string
  updated_at: string
}

export type CustomerBankInformation = {
  id: string
  customer_id: string
  bank_id: string
  account_number: string
  created_at: string
  updated_at: string
}

export type KYCInfo = {
  is_kyc_verified: boolean
  message: string
}
