import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface ProfessionalSocialMediaProps {
  professionalId: UniqueEntityID;
  platform: string;
  url: string;
}

export class ProfessionalSocialMedia extends Entity<ProfessionalSocialMediaProps> {
  get professionalId() {
    return this.props.professionalId;
  }

  get platform() {
    return this.props.platform;
  }

  get url() {
    return this.props.url;
  }

  set platform(platform: string) {
    this.props.platform = platform;
  }

  set url(url: string) {
    this.props.url = url;
  }

  static create(props: ProfessionalSocialMediaProps, id?: UniqueEntityID) {
    const professionalSocialMedia = new ProfessionalSocialMedia(
      {
        ...props,
      },
      id,
    );

    return professionalSocialMedia;
  }
}
