import { Skill } from '@/functions/getSkillColor'

export interface Experience {
   date: string,
   description: string,
   image_path: string,
   link?: string,
   skills: Skill[],
   title: string
}