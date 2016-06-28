


export interface Trap {
  id: string;
  name: string;

  position?: {
    lng?: string,
    lat?: string
  }

  meta?: {
    deleting?: boolean;
    updating?: boolean;
    error?: string;
  }
}
