import { Skill } from '@/functions/getSkillColor'

export interface Projet {
   description: string,
   github?: string,
   image_path: string,
   link?: string,
   skills: Skill[],
   title: string
}