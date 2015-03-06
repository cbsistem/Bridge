﻿using Bridge.Plugin;
using ICSharpCode.NRefactory.CSharp;
using ICSharpCode.NRefactory.TypeSystem;
using Mono.Cecil;
using System.Collections.Generic;
using System.Linq;

namespace Bridge.NET
{
    public class OperatorBlock : AbstractMethodBlock
    {
        public OperatorBlock(IEmitter emitter, OperatorDeclaration operatorDeclaration)
        {
            this.Emitter = emitter;
            this.OperatorDeclaration = operatorDeclaration;
        }

        public OperatorDeclaration OperatorDeclaration
        {
            get;
            set;
        }

        public override void Emit()
        {
            this.EmitOperatorDeclaration(this.OperatorDeclaration);
        }

        protected void EmitOperatorDeclaration(OperatorDeclaration operatorDeclaration)
        {
            this.EnsureComma();
            this.ResetLocals();
            var prevMap = this.BuildLocalsMap(operatorDeclaration.Body);
            this.AddLocals(operatorDeclaration.Parameters);

            var typeDef = this.Emitter.GetTypeDefinition();
            var methods = Helpers.GetMethodOverloads(typeDef, this.Emitter, operatorDeclaration.Name, 0, true);
            Helpers.SortMethodOverloads(methods, this.Emitter);

            if (methods.Count > 1)
            {
                MethodDefinition methodDef = Helpers.FindMethodDefinitionInGroup(this.Emitter, operatorDeclaration.Parameters, null, methods, operatorDeclaration.ReturnType);
                string name = Helpers.GetOverloadName(this.Emitter, methodDef, methods);
                this.EmitMethodDetector(this.Emitter.MethodsGroupBuilder, methodDef, name);

                this.Write(name);
            }
            else
            {
                this.Write(this.Emitter.GetEntityName(operatorDeclaration));
            }

            this.WriteColon();

            this.WriteFunction();

            this.EmitMethodParameters(operatorDeclaration.Parameters, operatorDeclaration);

            this.WriteSpace();

            var script = this.Emitter.GetScript(operatorDeclaration);

            if (script == null)
            {
                operatorDeclaration.Body.AcceptVisitor(this.Emitter);
            }
            else
            {
                this.BeginBlock();

                foreach (var line in script)
                {
                    this.Write(line);
                    this.WriteNewLine();
                }

                this.EndBlock();
            }

            this.ClearLocalsMap(prevMap);
            this.Emitter.Comma = true;
        }                  
    }
}
