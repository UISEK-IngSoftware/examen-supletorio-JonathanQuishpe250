import axios from 'axios';
import { Character, CharactersResponse } from '../models/character.model';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CDN_BASE_URL = import.meta.env.VITE_CDN_BASE_URL;
const IMAGE_SIZE = 500;

export const characterService = {
  getCharacters: async (page: number = 1): Promise<Character[]> => {
    try {
      const response = await axios.get<CharactersResponse>(
        `${API_BASE_URL}/characters?page=${page}`
      );
      return response.data.results;
    } catch (error) {
      throw new Error('Error fetching characters');
    }
  },

  getImageUrl: (portraitPath: string): string => {
    return `${CDN_BASE_URL}/${IMAGE_SIZE}${portraitPath}`;
  }
};