import { LinkType } from "./LinkType";

/**
 * 
 * @param links example: [
 *  '<https://api.github.com/repositories/10270250/commits?page=4>; rel="next"', 
 *  ' <https://api.github.com/repositories/10270250/commits?page=423>; rel="last"', 
 *  ' <https://api.github.com/repositories/10270250/commits?page=1>; rel="first"', 
 *  ' <https://api.github.com/repositories/10270250/commits?page=2>; rel="prev"'
 *  ]
 * @param linkType 
 */
const getLink = (links: string[], linkType: LinkType): string => {
  for (const link of links) {
    if(link) {
      const linkParts = link.split(';');
      const linkTypes = linkParts[1].split('=');
      const relPartIdx = linkTypes[1].indexOf(linkType);
      if (relPartIdx > -1) {
        const u1 = linkParts[0].trim().substring(1);
        return u1.substring(0, u1.length - 1);
      }
    }
  }
  return '';
}

export default getLink;