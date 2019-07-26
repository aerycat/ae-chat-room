import generate from 'nanoid/generate';

const numbers = '0123456789';
const uLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lLetters = 'abcdefghijklmnopqrstuvwxyz';

export function createRoomId() {
  return generate(`${uLetters}${lLetters}${numbers}`, 6);
}

export function createUuid() {
  return generate(`${uLetters}${lLetters}${numbers}`, 8);
}

export function createUserName(size = 3) {
  return generate(uLetters, size);
}

export function getStatusProperty(key) {
  switch (key) {
    case 1:
      return {
        tips: 'connecting',
        icon: 'green-flash'
      };
    case 2:
      return {
        tips: 'connected',
        icon: 'green'
      };
    case 3:
      return {
        tips: 'disconnected',
        icon: 'red'
      };
    default:
      return {
        tips: 'idle',
        icon: 'gray'
      };
  }
}

