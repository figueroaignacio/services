import fs from 'fs';
import path from 'path';

/**
 * Loads the complete knowledge base for the selected locale.
 * This reads the markdown files from content/knowledge and content/projects
 * and compiles them into a unified context string for the AI model.
 */
export function getKnowledgeBase(locale: 'en' | 'es'): string {
  const baseDir = path.join(process.cwd(), 'content');
  const knowledgeDir = path.join(baseDir, 'knowledge', locale);
  const projectsDir = path.join(baseDir, 'projects', locale);

  let knowledgeContent = '';

  // 1. Load general knowledge base documents
  const knowledgeFiles = ['about.md', 'pricing.md', 'faq.md'];
  for (const file of knowledgeFiles) {
    const filePath = path.join(knowledgeDir, file);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      knowledgeContent += `\n\n--- FILE: ${file} ---\n${fileContent}\n`;
    }
  }

  // 2. Load projects
  if (fs.existsSync(projectsDir)) {
    try {
      const projectFiles = fs.readdirSync(projectsDir).filter(
        (f) => f.endsWith('.md') || f.endsWith('.mdx')
      );
      knowledgeContent += '\n\n--- PROJECTS / PORTFOLIO ---\n';
      for (const file of projectFiles) {
        const filePath = path.join(projectsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        knowledgeContent += `\nProject File: ${file}\n${fileContent}\n`;
      }
    } catch (e) {
      console.error('Error reading projects for knowledge base:', e);
    }
  }

  return knowledgeContent;
}
