// src/data/participants.ts

export interface Participant {
  name: string;
  institution: string;
  email: string;
}

// Dictionary type: id -> Participant
export const participants: Record<string, Participant> = {
  alice: {
    name: 'Alice Smith',
    institution: 'University of Example',
    email: 'exmaple@exmpale.org'
  }
};
