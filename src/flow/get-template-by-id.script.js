export const GET_TEMPLATE_BY_ID = `
import SentimenTemplate from 0xTemplate

pub fun main(templateId: UInt64): SentimenTemplate.Template? {
  return SentimenTemplate.getTemplateById(templateId:templateId)
}
`;
