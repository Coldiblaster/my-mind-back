import { ProfessionalSocialMediaRepository } from '@/domain/platform/application/repositories/professional-social-media-repository';
import { ProfessionalSocialMedia } from '@/domain/platform/enterprise/entities/professional-social-media.entity';

export class InMemoryProfessionalSocialMediaSocialMediaRepository
  implements ProfessionalSocialMediaRepository {
  public items: ProfessionalSocialMedia[] = [];

  async findByID(id: string): Promise<ProfessionalSocialMedia | null> {
    const professionalSocialMedia = this.items.find(
      item => item.id.toString() === id,
    );

    if (!professionalSocialMedia) {
      return null;
    }

    return professionalSocialMedia;
  }

  async save(professionalSocialMedia: ProfessionalSocialMedia) {
    const itemIndex = this.items.findIndex(
      item => item.id === professionalSocialMedia.id,
    );

    this.items[itemIndex] = professionalSocialMedia;
  }

  async create(professionalSocialMedia: ProfessionalSocialMedia[]) {
    this.items.push(...professionalSocialMedia.map(item => item));
  }

  async delete(professionalSocialMedia: ProfessionalSocialMedia) {
    const itemIndex = this.items.findIndex(
      item => item.id === professionalSocialMedia.id,
    );

    this.items.splice(itemIndex, 1);
  }
}
