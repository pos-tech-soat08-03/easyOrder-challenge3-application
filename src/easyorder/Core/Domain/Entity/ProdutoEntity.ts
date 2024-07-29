
export class ProdutoEntity {
    private id: number;
    private nome: Categoria;
    private descricao: string;
    private preco: number;
    private imagemURL: string;

 constructor(id: number, nome: Categoria, descricao:string, preco:number, imagemURL:string) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.imagemURL = imagemURL;
 }
 public getId(): number {
    return this.id;
 }
 public getNome(): Categoria {
    return this.nome;
 }
 public getDescricao(): string {
    return this.descricao;
 }
 public getPreco(): number {
    return this.preco;
 }
    public getImagemURL(): string {
    return this.imagemURL;
 }

}

