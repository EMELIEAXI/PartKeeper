import type { User } from "../interfaces/User"

const mockUsers: User[] = [
  {
    userId: 1,
    role: "admin",
    firstName: "Anna",
    lastName: "Johansson",
    email: "anna.johansson@example.com",
    phone: "+46701234501"
  },
  {
    userId: 2,
    role: "user",
    firstName: "Erik",
    lastName: "Svensson",
    email: "erik.svensson@example.com",
    phone: "+46701234502"
  },
  {
    userId: 3,
    role: "user",
    firstName: "Maria",
    lastName: "Lindberg",
    email: "maria.lindberg@example.com",
    phone: "+46701234503"
  },
  {
    userId: 4,
    role: "user",
    firstName: "Johan",
    lastName: "Karlsson",
    email: "johan.karlsson@example.com",
    phone: "+46701234504"
  },
  {
    userId: 5,
    role: "user",
    firstName: "Sofia",
    lastName: "Berg",
    email: "sofia.berg@example.com",
    phone: "+46701234505"
  },
  {
    userId: 6,
    role: "admin",
    firstName: "Lukas",
    lastName: "Holm",
    email: "lukas.holm@example.com",
    phone: "+46701234506"
  },
  {
    userId: 7,
    role: "user",
    firstName: "Elin",
    lastName: "Sandström",
    email: "elin.sandstrom@example.com",
    phone: "+46701234507"
  },
  {
    userId: 8,
    role: "user",
    firstName: "Peter",
    lastName: "Dahl",
    email: "peter.dahl@example.com",
    phone: "+46701234508"
  },
  {
    userId: 9,
    role: "admin",
    firstName: "Karin",
    lastName: "Nyberg",
    email: "karin.nyberg@example.com",
    phone: "+46701234509"
  },
  {
    userId: 10,
    role: "user",
    firstName: "Markus",
    lastName: "Falk",
    email: "markus.falk@example.com",
    phone: "+46701234510"
  }
];

export default mockUsers;