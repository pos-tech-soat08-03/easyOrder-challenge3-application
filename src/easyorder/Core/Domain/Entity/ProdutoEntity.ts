
export class ProdutoEntity {
    private id: number;
    private nome: string;
    private descricao: string;
    private preco: number;
    private categoria: Categoria;
    private imagemURL: string;

 constructor(id: number, nome: string, descricao:string, preco:number,categoria: Categoria, imagemURL:string) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.categoria = categoria;
    this.imagemURL = imagemURL;
 }
 public getId(): number {
    return this.id;
 }
 public getNome(): string {
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
 public getCategoria(): Categoria {
    return this.categoria;
 }

}

