declare module "nerdamer" {
  interface NerdamerExpression {
    text(): string;
    latex(): string;
    evaluate: (options?: { decimals?: number }) => {
      text: (format: string, decimals?: number) => string;
    };
  }

  interface NerdamerStatic {
    (input: string): NerdamerExpression;
    solve(equation: string, variable: string): NerdamerExpression;
  }

  const nerdamer: NerdamerStatic;
  export default nerdamer;
}
