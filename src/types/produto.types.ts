export interface Produto {
  id: string;
  productKey: string;
  productName: string;
  shortDescription: string;
  fullDescription: string;
  idealFor: string[];
  mainPainsSolved: string[];
  deliverablesJson: string[];
  differentialsJson: string[];
  priorityRulesJson: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProdutoInput {
  productKey: string;
  productName: string;
  shortDescription: string;
  fullDescription: string;
  idealFor: string[];
  mainPainsSolved: string[];
  deliverablesJson: string[];
  differentialsJson: string[];
  priorityRulesJson: string[];
}

export interface UpdateProdutoInput extends Partial<CreateProdutoInput> {
  isActive?: boolean;
}