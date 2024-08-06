import { v4 as uuidv4 } from 'uuid';
import { CategoriaEnum } from '../ValueObject/CategoriaEnum';

export class PedidoComboEntity {
   private id: string;
   private lancheId: string | null;
   private bebidaId: string | null;
   private sobremesaId: string | null;
   private acompanhamentoId: string | null;

   constructor(
      lancheId: string | null,
      bebibdaId: string | null,
      sobremesaId: string | null,
      acompanhamentoId: string | null,
      id?: string
   ) {
      this.lancheId = lancheId || null;
      this.bebidaId = bebibdaId || null;
      this.sobremesaId = sobremesaId || null;
      this.acompanhamentoId = acompanhamentoId || null;
      this.id = id || uuidv4();
   }

   public getId(): string {
      return this.id;
   }

   public getLancheId(): string | null {
      return this.lancheId;
   }

   public getBebidaId(): string | null {
      return this.bebidaId;
   }

   public getSobremesaId(): string | null {
      return this.sobremesaId;
   }

   public getAcompanhamentoId(): string | null {
      return this.acompanhamentoId;
   }
}

