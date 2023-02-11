export class Tester {
  firstName: string;
  lastName: string;
  country: string;
  rank: number;

  constructor(firstName: string, lastName: string, country: string, rank: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.country = country;
    this.rank = rank;
  }
}

export class TesterBuilder {
  private readonly tester: Tester;

  constructor() {
    this.tester = {
      firstName: '',
      lastName: '',
      country: '',
      rank: 0,
    };
  }

  firstName(firstName: string): TesterBuilder {
    this.tester.firstName = firstName;
    return this;
  }

  lastName(lastName: string): TesterBuilder {
    this.tester.lastName = lastName;
    return this;
  }

  country(country: string): TesterBuilder {
    this.tester.country = country;
    return this;
  }

  rank(rank: number): TesterBuilder {
    this.tester.rank = rank;
    return this;
  }

  build(): Tester {
    return this.tester
  }

}
