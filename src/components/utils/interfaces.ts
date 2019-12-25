export interface Author {
  avatar_url: string;
  login: string;
}

export interface Commit {
  message: string;
  author: {
    date: Date;
  }
}

export interface CommitData {
  sha: string;
  author: Author;
  commit: Commit;
}
